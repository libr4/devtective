import TaskModel, { ITask } from '../models/TaskModel.js';
import TaskActivityModel from '../models/TaskActivityModel.js';
import { ITaskUpdate } from '../types/taskActivity.js';
import { ObjectId } from 'mongoose';

interface TaskActivityFilter {
    fromProject:ObjectId,
    fromTask?:ObjectId,
    taskId?:Number,
}

class TaskService {
    async getAllActivities(query:TaskActivityFilter) {
        return TaskActivityModel.find(query);
    }

    async updateTask(filter: TaskActivityFilter, changesArray: ITaskUpdate['changes']): Promise<ITask | null> {
        const changesInTask: Partial<ITask> = changesArray.reduce((acc, change) => {
            acc[change.field] = change.newValue;
            return acc;
        }, {} as Partial<ITask>);

        return TaskModel.findOneAndUpdate(filter, changesInTask, { new: true });
    }

    async createTaskActivity(taskActivity: ITaskUpdate): Promise<ITaskUpdate | null> {
        return TaskActivityModel.create(taskActivity);
    }

}

export default new TaskService();