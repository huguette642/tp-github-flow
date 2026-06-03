import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Query, ParseBoolPipe } from '@nestjs/common'; // ⚠️ N'oubliez pas d'importer Query et ParseBoolPipe en haut de votre fichier
import { ApiQuery } from '@nestjs/swagger'; // ⚠️ Importez ApiQuery de @nestjs/swagger

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Créer une tâche' })
  @ApiResponse({ status: 201, description: 'Tâche créée avec succès' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Récupérer toutes les tâches (optionnellement filtrées par statut)' })
  @ApiResponse({ status: 200, description: 'Liste des tâches' })
  @ApiQuery({ name: 'done', required: false, type: Boolean, description: 'Filtrer par statut de complétion' })
  @Get()
  findAll(@Query('done', new ParseBoolPipe({ errorHttpStatusCode: 400 })) done?: boolean) {
    return this.tasksService.findAll(done);
  }

  @ApiOperation({ summary: 'Récupérer une tâche par ID' })
  @ApiResponse({ status: 200, description: 'Tâche trouvée' })
  @ApiResponse({ status: 404, description: 'Tâche introuvable' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  @ApiResponse({ status: 200, description: 'Tâche mise à jour' })
  @ApiResponse({ status: 404, description: 'Tâche introuvable' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiResponse({ status: 200, description: 'Tâche supprimée' })
  @ApiResponse({ status: 404, description: 'Tâche introuvable' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id);
  }
}
