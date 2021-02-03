// config para salvar no storage no navegador os estados
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber', // id unico no storage para saber que sao informacoes da aplicacao
      storage,
      whitelist: ['auth', 'user'], // registra quais reducers que deseja salvar no storage do navegador
    },
    reducers
  );

  return persistedReducer;
};
