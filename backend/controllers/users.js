"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("express-async-errors");
const user_1 = __importDefault(require("../models/user"));
const usersRouter = (0, express_1.Router)();
const populateQuery = [
    { path: 'events', select: 'title' },
    { path: 'toDos', select: 'description' },
];
usersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({}).populate(populateQuery);
    res.json(users);
}));
usersRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(req.params.id);
    if (user) {
        res.json({
            user,
            events: user.events,
            toDos: user.toDos,
        });
    }
    else {
        res.status(404).end();
    }
}));
usersRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
}));
exports.default = usersRouter;
