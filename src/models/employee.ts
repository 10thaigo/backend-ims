import db from '../utils/db';
import { employeeSchema, EmployeeType } from '../schemas/employee';

const TABLE_NAME = 'employee';

export default class Employee {
    static async getByUser(user: string): Promise<EmployeeType | null> {
        const employee = await db<EmployeeType>(TABLE_NAME)
            .where({ user })
            .first();
        
        if(!employee) {
            return null;
        }
        
        return await employeeSchema.parseAsync(employee)
    }
}