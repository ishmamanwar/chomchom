export interface Pet {
  id: string;
  name: string;
  type: "dog" | "cat" | "bird" | "other";
  birthDate: string;
  imageUrl?: string;
}