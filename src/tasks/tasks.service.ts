import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  findAll(done?: boolean) {
  // Si vous utilisez une base de données (Exemple avec un ORM fictif) :
  if (done !== undefined) {
    return this.prisma.task.findMany({ where: { done } });
    // OU avec TypeORM : return this.taskRepository.find({ where: { done } });
  }
  return this.prisma.task.findMany();

  /* Si vous utilisez un tableau en mémoire (Mock) :
  if (done !== undefined) {
    return this.tasks.filter(task => task.done === done);
  }
  return this.tasks;
  */
}

  async findOne(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tâche #${id} introuvable`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id);
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number): Promise<Task> {
    await this.findOne(id);
    return this.prisma.task.delete({ where: { id } });
  }
}
