import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonTitle, IonHeader } from '@ionic/angular/standalone';

interface Habit {
  id: number;
  name: string;
  duration: number;
  startDate: Date;
  progress: boolean[];
  color: string;
}

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './habits.page.html',
  styleUrls: ['./habits.page.scss'],
})
export class HabitsComponent implements OnInit {
  form: FormGroup;
  habits: Habit[] = [];
  editingHabitId: number | null = null;
  registerError: any;
  selectedColor: string = 'purple';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      duration: [
        21,
        [Validators.required, Validators.min(1), Validators.max(365)],
      ],
    });

    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      this.habits = JSON.parse(storedHabits);
      this.habits.forEach((h) => {
        h.startDate = new Date(h.startDate);
        if (!h.color) {
          h.color = 'purple';
        }
      });
    }
  }

  ngOnInit(): void {}

  onSubmit() {
    const name = this.form.value.name.trim();
    const duration = this.form.value.duration;

    if (!name || duration < 1) {
      this.registerError =
        'Por favor, introduce un nombre y una duración válida.';
      return;
    } else {
      this.registerError = null;
    }

    if (this.editingHabitId !== null) {
      this.habits = this.habits.map((h) => {
        if (h.id === this.editingHabitId) {
          const newProgress =
            h.duration !== duration
              ? new Array(duration).fill(false)
              : h.progress;
          return {
            ...h,
            name,
            duration,
            progress: newProgress,
            color: this.selectedColor,
          };
        }
        return h;
      });
      this.editingHabitId = null;
    } else {
      const newHabit: Habit = {
        id: Date.now(),
        name,
        duration,
        startDate: new Date(),
        progress: new Array(duration).fill(false),
        color: this.selectedColor,
      };
      this.habits.push(newHabit);
    }

    this.saveHabitsToStorage();
    this.form.reset({ duration: 21 });
    this.selectedColor = 'purple';
  }

  toggleDayProgress(habit: Habit, index: number) {
    const newProgress = [...habit.progress];
    newProgress[index] = !newProgress[index];

    const updatedHabits = this.habits.map((h) =>
      h.id === habit.id ? { ...h, progress: newProgress } : h
    );
    this.habits = updatedHabits;

    this.saveHabitsToStorage();
  }

  getCompletedDays(habit: Habit): number {
    return habit.progress.filter((p) => p).length;
  }
  getDayStatus(
    habit: Habit,
    index: number
  ): 'completed' | 'missed' | 'pending' {
    const today = new Date();
    const habitDay = new Date(habit.startDate);
    habitDay.setDate(habitDay.getDate() + index);

    if (habitDay > today) {
      return 'pending';
    }

    return habit.progress[index] ? 'completed' : 'missed';
  }

  editHabit(habit: Habit) {
    this.form.setValue({
      name: habit.name,
      duration: habit.duration,
    });
    this.editingHabitId = habit.id;
    this.selectedColor = habit.color;
  }

  deleteHabit(id: number) {
    this.habits = this.habits.filter((h) => h.id !== id);
    if (this.editingHabitId === id) this.cancelEdit();
    this.saveHabitsToStorage();
  }

  cancelEdit() {
    this.editingHabitId = null;
    this.form.reset({ duration: 21 });
    this.selectedColor = 'purple';
  }

  private saveHabitsToStorage(): void {
    localStorage.setItem('habits', JSON.stringify(this.habits));
  }
}
