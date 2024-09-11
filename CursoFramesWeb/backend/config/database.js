const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db_finance')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."





