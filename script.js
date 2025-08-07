document.getElementById('cep').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    buscarEndereco();
  }
});

async function buscarEndereco() {
  const cepInput = document.getElementById('cep');
  const cep = cepInput.value.replace(/\D/g, '');

  if (cep.length !== 8) {
    alert('CEP inválido. Digite 8 números.');
    return;
  }

  try {
    // Desabilita o input enquanto carrega (opcional)
    cepInput.disabled = true;

    const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      alert('CEP não encontrado.');
      limpaCampos();
      return;
    }

    document.getElementById('logradouro').value = dados.logradouro || '';
    document.getElementById('bairro').value = dados.bairro || '';
    document.getElementById('localidade').value = dados.localidade || '';
    document.getElementById('uf').value = dados.uf || '';

  } catch (erro) {
    alert('Erro ao buscar endereço.');
    console.error(erro);
  } finally {
    cepInput.disabled = false;
  }
}

function limpaCampos() {
  document.getElementById('logradouro').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('localidade').value = '';
  document.getElementById('uf').value = '';
}