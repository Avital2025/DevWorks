export class user {
    constructor(
        public FullName: string,
        public email: string,
        public passwordHash: string,
        public role: "Worker"

    ) { }

}