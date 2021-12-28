import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
  getTasks(@Req() req, @Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    console.log(req.user);
    return this.tasksService.getTasks(filterDto, req.user);
  }

  // http://localhost:300/tasks/wewewe
  @Get('/:id')
  getTAskByID(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createTask(@Req() req, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    // console.log(req);
    console.log('eren3434');
    console.log(req.user);
    return this.tasksService.createTask(createTaskDto, req.user);
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

  // @Post()
  // @UseGuards(AuthGuard())
  // createTask(@Req() req, @Body() createTaskDto) {
  //   // console.log(req);
  //   console.log('eren111122334443333332');
  //   console.log(req.user);
  //   return this.tasksService.createTask(createTaskDto, req.user);
  // }
}
