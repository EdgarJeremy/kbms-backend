import { BadRequest } from '@feathersjs/errors'
import bcrypt from 'bcryptjs'

export const validatePassword = async (context) => {
  const { params, data } = context;
  const { users } = params;
  
  const hash = bcrypt.hashSync(data.old_password);
  const passed = bcrypt.compareSync(data.old_password, users.password);

  console.log(passed);

  if (!passed) throw new BadRequest('Invalid old password')
  
  delete context.data.old_password; 
}