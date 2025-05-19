// api.js
export const API_URL = 'https://dbtest.tahmidev.my.id/api'; 
// export const API_URL = 'https://dbsf.friendz.id/api'; 
export const URL_BASE = 'https://dbtest.tahmidev.my.id'; 

export const ENDPOINTS = {
  USER: '/user',
  ME: '/acc/me',
  USERALL: '/acc/alls',
  // USERPOST: '/regs/registerStaff',
  USERPUT: '/acc/update/{id}',
  ANALYS: '/analytic',
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
  DORMPUT: '/dormitories/{id}',
  DORMPOST: '/dormitories',
  DORMDELETE: '/dormitories/{id}',
  SANTRIGET: '/students',
  SANTRIPUT: '/students/{nis}',
  SANTRIPOST: '/students',
  SANTRIDELETE: '/students/deletes/{nis}',
  KATEGORIPAKETGET: '/categories',
  PAKETGET: '/pakets',
  PAKETPUT: '/pakets/{id}',
  PAKETPOST: '/pakets',
  PAKETDELETE: '/pakets/{id}',
  TRASHPAKET: '/pakets/trashed',

};

