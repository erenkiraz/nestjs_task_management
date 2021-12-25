import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-fiter-dto';
import { Task } from './dto/task.entity';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @UseGuards(AuthGuard())
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

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

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    const { status } = updateTaskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
