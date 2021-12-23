import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './dto/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // http://localhost:300/tasks/wewewe
  @Get('/:id')
  getTAskByID(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // // http://localhost:300/tasks/wewewe
  // @Get('/:id')
  // getTAskByID(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  // ): Task {
  //   const { status } = updateTaskStatusDTO;
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
