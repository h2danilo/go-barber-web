import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '~/services/history';
import api from '~/services/api';
import { signInSucess } from './actions';

// * = funcionalidade do JS que chama generator, como se fosse um assync, no caso nao utilizou assync, devido, generator ser mais potente que o assync
export function* signIn({ payload }) {
  const { email, password } = payload;
  // yield = como se fosse o await do generator, td que vier após irá aguardar execucao.
  // call =  responsavel por chamar metodos. que sao assincronos e que retornar promisses.
  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!user.provider) {
    console.tron.error('Usuário não é prestador');
    return;
  }
  // metodo put do saga é utilizado para disparar uma action
  yield put(signInSucess(token, user));

  history.push('/dashboard');
}

// all => cadastrar varios listners, que ficar ouvindo qdo uma action for disparada para disparar essa acao
// takeLatest => se usuario clicar uma vez no botao para adicionar no carrinho e logo em seguida clicar novamente
// antes da chamada api finalizar, o saga irá descartar a primeira chamada e executar a atual (adicionando uma vez só no carrinho).
// takeLatest > 1º paramento = qual acao redux quer ouvir e 2º paramento = qual action/funcao quer disparar
export default all([
  // takeLatest => toda vez que ouvir requisicao SIGN_IN_REQUEST chama a funcao "signIn"
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
