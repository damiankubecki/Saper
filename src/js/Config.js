import Move from "./Move.js";

export default class Config extends Move {
    constructor() {
        super();
    }

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
        },
        normal: {
            cell: 38,
            font: 32,
        },
        big: {
            cell: 44,
            font: 36,
        },
    };

    rowsNumber;
    colsNumber;
    bombsNumber;
    currentDifficulty;
    currentItemsSize;
    numberOfCellsToClickOnStart;

    // rowsNumber = {
    //     number: null,
    //     setNumber: number => this.rowsNumber = number,
    //     getNumber: () => this.rowsNumber
    // }

    // colsNumber = {
    //     number: null,
    //     set: function (number) { 
    //         this.number = number;
    //     },
    //     get: function () {
    //         return this.number;
    //     },
    // }


    setDifficulty(diffculty) {
        const {
            easy,
            medium,
            expert
        } = this.#difficulty;

        let configuration;

        switch (diffculty) {
            case "easy":
                configuration = easy;
                break;
            case "medium":
                configuration = medium;
                break;
            case "expert":
                configuration = expert;
                break;
        }

        // this.rows.setNumber(configuration.rows);
        // this.cols.setNumber(5);
        this.rowsNumber = configuration.rows;
        this.colsNumber = configuration.cols;
        this.bombsNumber = configuration.bombs;
        this.currentDifficulty = diffculty;
    }

    getCurrentDifficulty = () => this.currentDifficulty;


    setItemsSize(size) {
        const {
            small,
            normal,
            big
        } = this.#itemsSize;

        switch (size) {
            case "small":
                this.itemsSize = small;
                break;
            case "normal":
                this.itemsSize = normal;
                break;
            case "big":
                this.itemsSize = big;
                break;
        }

        this.currentItemsSize = size;
    }

    getCurrentItemsSize = () => this.currentItemsSize;


    setNumberOfCellsToClickOnStart(number) {
        this.numberOfCellsToClickOnStart = number;
    }

    getNumberOfCellsToClickOnStart = () => this.numberOfCellsToClickOnStart;
}