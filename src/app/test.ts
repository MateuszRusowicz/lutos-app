const highScore: number | boolean = 23;
const stuff: number[] | string[] = [];
let skillLevel: "Beginner" | "advanced" | "expert";
type SkiSchoolStudent = {
  name: string;
  age: number;
  sport: "ski" | "snowboard";
  level: typeof skillLevel;
};
