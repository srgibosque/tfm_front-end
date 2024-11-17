export class UserDTO {
  id: number | null;
  name: string; 
  email: string; 
  password: string; 
  gender: 'male' | 'female' | undefined; 
  birthdate: Date | null; 

  constructor(
    id: number | null,
    name: string, 
    email: string, 
    password: string, 
    gender: 'male' | 'female' | undefined, 
    birthdate: Date | null
  ){
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.birthdate = birthdate;
  }
}

