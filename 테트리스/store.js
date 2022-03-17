import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
export const __DEV_END_GAME = '__DEV_END_GAME';
export const NEXT_MINO = 'NEXT_MINO';

export const MINOS = {
    NONE: 0,
    I_MINO: 1, O_MINO: 2, Z_MINO: 3, S_MINO: 4, 
    T_MINO: 5, J_MINO: 6, L_MINO: 7,
};

const minoTableData = [
    [[0, 0, 0, 0],
     [0, 0, 0, 0]],
    
    [[0, 0, 0, 0],
     [MINOS.I_MINO, MINOS.I_MINO, MINOS.I_MINO, MINOS.I_MINO]],
    
    [[0, MINOS.O_MINO, MINOS.O_MINO, 0],
     [0, MINOS.O_MINO, MINOS.O_MINO, 0]],
    
    [[MINOS.Z_MINO, MINOS.Z_MINO, 0, 0],
     [0, MINOS.Z_MINO, MINOS.Z_MINO, 0]],
    
    [[0, 0, MINOS.S_MINO, MINOS.S_MINO],
     [0, MINOS.S_MINO, MINOS.S_MINO, 0]],
    
    [[0, MINOS.T_MINO, 0, 0],
     [MINOS.T_MINO, MINOS.T_MINO, MINOS.T_MINO, 0]],
    
    [[MINOS.J_MINO, 0, 0, 0],
     [MINOS.J_MINO, MINOS.J_MINO, MINOS.J_MINO, 0]],

    [[0, 0, 0, MINOS.L_MINO],
     [0, MINOS.L_MINO, MINOS.L_MINO, MINOS.L_MINO]],
];

const width = 16, height = 25;

const createTableData = () => {
    let tableData = Array(height);

    for(let i = 0; i < height; i++){
        tableData[i] = Array(width).fill(0);
    }

    return tableData;
}

const getRandomMino = () => {
    const chosenMino = Math.floor(Math.random() * 7 + 1);
    console.log(chosenMino);
    return minoTableData[chosenMino];
}

export default new Vuex.Store({
    state: {
        tableData: createTableData(),

        timer: 0,
        halted: true,
        clearLineNumber: 0,
        nextMinoData: getRandomMino(),
    },

    getters: {
    },

    mutations: {
        [START_GAME](state) {
            state.timer = 0;
            state.halted = false;
            state.clearLineNumber = 0;
            for(let i = 0; i < 2; i++){
                for(let j = 0; j < 4; j++){
                    Vue.set(state.tableData[i], 6 + j, state.nextMinoData[i][j]);
                }
            }

            Vue.set(state, 'nextMinoData', getRandomMino());
        },
        [__DEV_END_GAME](state) {
            state.timer = 0;
            state.halted = true;
            state.clearLineNumber = 0;
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },
        [NEXT_MINO](state) {
            Vue.set(state, 'nextMinoData', getRandomMino());
        }
    },

    actions: {

    }
});
