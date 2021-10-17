import Move from './Move.js';

export default class Config extends Move {
    constructor() {
        super();
    }

    gameContainer = document.querySelector('.gameContainer');
    gameBoard = document.querySelector('.board');

    #difficultyLevels = {
        easy: {
            rows: 8,
            cols: 8,
            bombs: 10,
        },
        medium: {
            rows: 16,
            cols: 16,
            bombs: 40,
        },
        expert: {
            rows: 16,
            cols: 30,
            bombs: 99,
        },
    }
    #itemsSize = {
        small: {
            cell: 30,
            font: 25,
            name: 'small'
        },
        normal: {
            cell: 38,
            font: 32,
            name: 'normal'
        },
        big: {
            cell: 44,
            font: 36,
            name: 'big'
        },
    }

    #rowsNumber;
    #colsNumber;
    #bombsNumber;
    #currentItemsSize;
    #numberOfClicksOnStart;

    getRowsNumber = () => this.#rowsNumber;
    getColsNumber = () => this.#colsNumber;
    getBombsNumber = () => this.#bombsNumber;
    getCurrentItemsSize = () => this.#currentItemsSize;
    getNumberOfClicksOnStart = () => this.#numberOfClicksOnStart;

    #setRowsNumber = number => this.#rowsNumber = number;
    #setColsNumber = number => this.#colsNumber = number;
    #setBombsNumber = number => this.#bombsNumber = number;
    
    setDifficulty(difficulty, custom = false) {
        const config = custom ? custom : this.#standardDifficulty(difficulty);
        const {
            rows,
            cols,
            bombs
        } = config;

        this.#setRowsNumber(rows);
        this.#setColsNumber(cols);
        this.#setBombsNumber(bombs);
    }

    #standardDifficulty(difficulty) {
        const {
            easy,
            medium,
            expert
        } = this.#difficultyLevels;

        switch (difficulty) {
            case 'easy':
                return easy;
                break;
            case 'medium':
                return medium;
                break;
            case 'expert':
                return expert;
                break;
        }
    }

    setItemsSize(size) {
        const {
            small,
            normal,
            big
        } = this.#itemsSize;

        switch (size) {
            case 'small':
                this.#currentItemsSize = small;
                break;
            case 'normal':
                this.#currentItemsSize = normal;
                break;
            case 'big':
                this.#currentItemsSize = big;
                break;
        }
    }
    

    setNumberOfClicksOnStart(number) {
        this.#numberOfClicksOnStart = number;
    }
    
}