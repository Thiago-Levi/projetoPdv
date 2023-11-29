const padraoSenha = new RegExp(/^(?=.*[a-zA-Z0-9])(?=.*[\W_]).{6,}$/);

module.exports = padraoSenha;
