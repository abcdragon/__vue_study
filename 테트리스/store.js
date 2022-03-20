import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
export const __DEV_END_GAME = '__DEV_END_GAME';
export const NEXT_MINO = 'NEXT_MINO';
export const CONTROL_MINO = 'CONTROL_MINO';
export const CHANGE_MINO = 'CHANGE_MINO';

export const MINOS = {
    NONE: 0,
    I_MINO: 1, O_MINO: 2, Z_MINO: 3, S_MINO: 4, 
    T_MINO: 5, J_MINO: 6, L_MINO: 7,
};

export const MINO_COLORS = [
    'white',    // NONE
    'cyan',     // I_MINO
    'yellow',   // O_MINO
    'red',      // Z_MINO
    'green',    // S_MINO
    'blue',     // T_MINO
    'orange',   // J_MINO
    'purple',   // L_MINO
];

const minoShapeTable = [
    [[0, 0, 0, 0],
     [0, 0, 0, 0]],
    
    [[MINOS.I_MINO, MINOS.I_MINO, MINOS.I_MINO, MINOS.I_MINO]],
    
    [[MINOS.O_MINO, MINOS.O_MINO],
     [MINOS.O_MINO, MINOS.O_MINO]],
    
    [[MINOS.Z_MINO, MINOS.Z_MINO, 0],
     [0, MINOS.Z_MINO, MINOS.Z_MINO]],
    
    [[0, MINOS.S_MINO, MINOS.S_MINO],
     [MINOS.S_MINO, MINOS.S_MINO, 0]],
    
    [[0, MINOS.T_MINO, 0],
     [MINOS.T_MINO, MINOS.T_MINO, MINOS.T_MINO]],
    
    [[MINOS.J_MINO, 0, 0],
     [MINOS.J_MINO, MINOS.J_MINO, MINOS.J_MINO]],

    [[0, 0, MINOS.L_MINO],
     [MINOS.L_MINO, MINOS.L_MINO, MINOS.L_MINO]],
];

const Left = 'ArrowLeft';
const Right = 'ArrowRight';
const Down = 'ArrowDown';
const Space = ' ';

const width = 16, height = 25;

const createEmptyTable = () => {
    let tableData = Array(height);

    for(let i = 0; i < height; i++){
        tableData[i] = Array(width).fill(0);
    }

    return tableData;
};

const getRandomMino = () => {
    const chosenMinoShape = minoShapeTable[Math.floor(Math.random() * 7 + 1)];

    console.log(chosenMinoShape); // debug

    const offsetX = parseInt((width - chosenMinoShape[0].length) / 2); // 실수이면 인덱싱이 안 된다.
    return {
        data: chosenMinoShape,
        abPos: { // abPos : absolute position / format : x, y
            offsetX,
            
            x1: offsetX, 
            y1: 0, 
            
            x2: offsetX + chosenMinoShape[0].length - 1, 
            y2: chosenMinoShape.length - 1,
        },
    };
};

export default new Vuex.Store({
    state: {
        tableData: createEmptyTable(),
        
        timer: 0,
        halted: true,
        clearLineNumber: 0,

        nowMino: null,
        nextMino: getRandomMino(),
    },

    mutations: {
        [CHANGE_MINO](state) {
            Vue.set(state, 'nowMino', state.nextMino);
            Vue.set(state, 'nextMino', getRandomMino());

            for(let i = 0; i < state.nowMino.data.length; i++){
                for(let j = 0; j < state.nowMino.data[0].length; j++){
                    Vue.set(state.tableData[i], state.nowMino.abPos.x1 + j, state.nowMino.data[i][j]);
                }
            }
        },

        [START_GAME](state) {
            Vue.set(state, 'tableData', createEmptyTable());

            state.timer = 0;
            state.halted = false;
            state.clearLineNumber = 0;
        },

        [__DEV_END_GAME](state) {
            state.timer = 0;
            state.halted = true;
            state.clearLineNumber = 0;

            Vue.set(state, 'tableData', createEmptyTable());
        },

        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },

        [NEXT_MINO](state) {
            Vue.set(state, 'nextMinoData', getRandomMino());
        },

        [CONTROL_MINO](state, inputKey) {
            switch(inputKey){
                case Left:
                    return console.log('Left Turn');

                case Right:
                    return console.log('Right Turn');
            
                case Down:
                    setTimeout(function() {
                        console.log('pressed...');
                    }, 500);
                
                    return;
                
                case Space: // space 임
                    const {x1, y1, x2, y2} = {...state.nowMino.abPos};

                    let [x, y] = [x1, y2];
                    let flag = true;

                    for(y = y2 + 1; y < height; y++){
                        for(x = x1; x <= x2 && flag; x++){
                            if(state.nowMino.data[y2][x - x1] !== 0 && state.tableData[y][x] !== 0){
                                flag = false;
                            }
                        }

                        if(flag === false) break;
                    }

                    y -= 1;
                    
                    
                    for(x = x1; x <= x2; x++){
                        state.tableData[y - y2 + y1][x] = state.tableData[y1][x] || state.tableData[y - y2 + y1][x];
                        state.tableData[y][x] = state.tableData[y2][x] || state.tableData[y][x];

                        Vue.set(state.tableData[y1], x, 0);
                        Vue.set(state.tableData[y2], x, 0);
                    }

                    Vue.set(state.nowMino.abPos, 'y1', y - 1);
                    Vue.set(state.nowMino.abPos, 'y2', y);

                   return; // force down
            }
        },
    },
});
