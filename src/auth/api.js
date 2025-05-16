// api.js
export const API_URL = 'http://127.0.0.1:8000/api'; 
// export const API_URL = 'https://dbsf.friendz.id/api'; 
export const URL_BASE = 'http://127.0.0.1:8000'; 

export const ENDPOINTS = {
  USER: '/user',
  LOGIN_STAFF: '/auth/loginStaff',
  LOGOUT: '/acc/logout',
  REGISTER_STAFF: '/regs/registerStaff',
  ROLEGET: '/roles',
  ROLESTO: '/roles',
  TEPDELETE: '/roles/dest/{id}',
  TEPPUT: '/roles/{id}',
  ME: '/acc/me',
  PROFGET: '/profile',
  PROFSTO: '/profile',
  RKPAGT: '/rekap/anggota',
  ALLAJEN: '/schdl',
  ALLUSER: '/acc/all',
  ALLUSERS: '/acc/alls',
  ASAL: '/task',
  BEKDB: '/backup-database',
  RESDB: '/restore-database',
  DORMGET: '/dormitories',
  SANTRIGET: '/students',
  SANTRIPUT: '/students/{nis}',
  SANTRIPOST: '/students',
  SANTRIDELETE: '/students/deletes/{nis}',
};

