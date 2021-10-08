import Move from './Move.js';

export default class Config extends Move {
    constructor() {
        super();
    }

    gameContainer = document.querySelector('.gameContainer');
    gameBoard = document.querySelector('.board');

    #difficulty = {
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
    };

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
    };

    #rowsNumber;
    #colsNumber;
    #bombsNumber;
    #currentItemsSize;
    #numberOfClicksOnStart;


    #setRowsNumber = number => this.#rowsNumber = number;
    getRowsNumber = () => this.#rowsNumber;

    #setColsNumber = number => this.#colsNumber = number;
    getColsNumber = () => this.#colsNumber;

    #setBombsNumber = number => this.#bombsNumber = number;
    getBombsNumber = () => this.#bombsNumber;

    setDifficulty(diffculty) {
        const {
            easy,
            medium,
            expert
        } = this.#difficulty;

        let configuration;

        switch (diffculty) {
            case 'easy':
                configuration = easy;
                break;
            case 'medium':
                configuration = medium;
                break;
            case 'expert':
                configuration = expert;
                break;
        }

        this.#setRowsNumber(configuration.rows);
        this.#setColsNumber(configuration.cols);
        this.#setBombsNumber(configuration.bombs);
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
    getCurrentItemsSize = () => this.#currentItemsSize;

    setNumberOfClicksOnStart(number) {
        this.#numberOfClicksOnStart = number;
    }
    getNumberOfClicksOnStart = () => this.#numberOfClicksOnStart;
}