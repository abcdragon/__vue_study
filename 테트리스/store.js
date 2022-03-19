import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
export const __DEV_END_GAME = '__DEV_END_GAME';
export const NEXT_MINO = 'NEXT_MINO';
export const TURN_MINO = 'TURN_MINO';

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
            leftUp: { x: offsetX, y: 0}, 
            rightDown: { x: offsetX + chosenMinoShape[0].length - 1, y: chosenMinoShape.length - 1},
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
        [START_GAME](state) {
            Vue.set(state, 'tableData', createEmptyTable());

            state.timer = 0;
            state.halted = false;
            state.clearLineNumber = 0;

            Vue.set(state, 'nowMino', state.nextMino);
            Vue.set(state, 'nextMino', getRandomMino());

            for(let i = 0; i < state.nowMino.data.length; i++){
                for(let j = 0; j < state.nowMino.data[0].length; j++){
                    Vue.set(state.tableData[i], state.nowMino.abPos.leftUp.x + j, state.nowMino.data[i][j]);
                }
            }
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

        [TURN_MINO](state, inputKey) {
            switch(inputKey){
                case 'ArrowLeft':
                    return alert('Left Turn');

                case 'ArrowRight':
                    return alert('Right Turn');
            }
        },
    },

    actions: {

    }
});
