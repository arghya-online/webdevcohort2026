import type { Todo } from "../../validation/todo.schema.js";
import type { Request, Response } from "express";

class TodoController {
  private _db: Todo[];

  constructor() {
    this._db = [];
  }

  public handleGetAllTodos(req: Request, res: Response) {}
}

export default TodoController;
