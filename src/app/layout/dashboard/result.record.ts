export class ResultRecord {
    id: string;
    position: string;
    age: string;
    experience: string;
    last_job: string;

    constructor(result) {
        this.id = JSON.stringify(result.id).replace(/["]+/g, '');
        this.position = JSON.stringify(result.position).replace(/["]+/g, '');
        this.age = JSON.stringify(result.age).replace(/["]+/g, '');
        this.experience = JSON.stringify(result.experience).replace(/["]+/g, '');
        this.last_job = JSON.stringify(result.last_job).replace(/["]+/g, '');
    }

}
