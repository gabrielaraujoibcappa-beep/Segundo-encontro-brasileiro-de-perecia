export enum AppState {
  UPLOAD,
  PREVIEW,
}

export interface AppStateData {
  userImage: File | null;
  city: string;
  userName: string; // Adicionado o nome do usuário
  generatedTicket: string | null;
}