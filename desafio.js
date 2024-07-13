const repasses = [
  { orgao: 'MEC', data: '01/01/2024', valor: 500.0, status: 'sucesso' },
  {
    orgao: 'Ministério da Saúde',
    data: '03/01/2024',
    valor: 750.0,
    status: 'sucesso'
  },
  {
    orgao: 'MEC',
    data: '05/01/2024',
    valor: 1000.0,
    status: 'falha',
    motivo: 'falta de documentação'
  },
  {
    orgao: 'Ministério da Educação',
    data: '08/01/2024',
    valor: 600.0,
    status: 'sucesso'
  },
  {
    orgao: 'Ministério da Saúde',
    data: '10/01/2024',
    valor: 900.0,
    status: 'sucesso'
  },
  {
    orgao: 'Ministério da Educação',
    data: '12/01/2024',
    valor: 300.0,
    status: 'falha',
    motivo: 'dados inválidos'
  },
  {
    orgao: 'Ministério da Saúde',
    data: '15/01/2024',
    valor: 1200.0,
    status: 'sucesso'
  },
  { orgao: 'MEC', data: '17/01/2024', valor: 800.0, status: 'sucesso' },
  {
    orgao: 'Ministério da Educação',
    data: '20/01/2024',
    valor: 400.0,
    status: 'sucesso'
  },
  {
    orgao: 'MEC',
    data: '22/01/2024',
    valor: 1100.0,
    status: 'falha',
    motivo: 'falta de verba'
  }
]

function exibirTotalRepasses(repasses) {
  console.log(`Total de repasses processados: ${repasses.length}`)
}

function analisarTransacoes(repasses) {
  const sucesso = repasses.filter(r => r.status === 'sucesso')
  const falha = repasses.filter(r => r.status === 'falha')

  const resumoSucesso = {
    total: sucesso.length,
    porOrgao: {},
    valorTotal: 0,
    valorPorOrgao: {}
  }

  const resumoFalha = {
    total: falha.length,
    porOrgao: {},
    porMotivo: {},
    valorTotal: 0,
    valorPorOrgao: {},
    valorPorMotivo: {}
  }

  sucesso.forEach(r => {
    resumoSucesso.valorTotal += r.valor
    resumoSucesso.porOrgao[r.orgao] = (resumoSucesso.porOrgao[r.orgao] || 0) + 1
    resumoSucesso.valorPorOrgao[r.orgao] =
      (resumoSucesso.valorPorOrgao[r.orgao] || 0) + r.valor
  })

  falha.forEach(r => {
    resumoFalha.valorTotal += r.valor
    resumoFalha.porOrgao[r.orgao] = (resumoFalha.porOrgao[r.orgao] || 0) + 1
    resumoFalha.porMotivo[r.motivo] = (resumoFalha.porMotivo[r.motivo] || 0) + 1
    resumoFalha.valorPorOrgao[r.orgao] =
      (resumoFalha.valorPorOrgao[r.orgao] || 0) + r.valor
    resumoFalha.valorPorMotivo[r.motivo] =
      (resumoFalha.valorPorMotivo[r.motivo] || 0) + r.valor
  })

  console.log('Resumo de repasses bem-sucedidos:', resumoSucesso)
  console.log('Resumo de repasses com falha:', resumoFalha)
}

function exibirEstatisticas(repasses) {
  const maiorValor = repasses.reduce(
    (max, r) => (r.valor > max.valor ? r : max),
    repasses[0]
  )
  const menorValor = repasses.reduce(
    (min, r) => (r.valor < min.valor ? r : min),
    repasses[0]
  )
  const dias = {}
  const orgaos = {}
  const orgaosSucesso = {}
  const orgaosFalha = {}
  const motivosFalha = {}

  repasses.forEach(r => {
    dias[r.data] = (dias[r.data] || 0) + 1
    orgaos[r.orgao] = (orgaos[r.orgao] || 0) + 1

    if (r.status === 'sucesso') {
      orgaosSucesso[r.orgao] = (orgaosSucesso[r.orgao] || 0) + 1
    } else {
      orgaosFalha[r.orgao] = (orgaosFalha[r.orgao] || 0) + 1
      motivosFalha[r.motivo] = (motivosFalha[r.motivo] || 0) + 1
    }
  })

  const diaMaisRepasses = Object.keys(dias).reduce((a, b) =>
    dias[a] > dias[b] ? a : b
  )
  const orgaoMaisRepasses = Object.keys(orgaos).reduce((a, b) =>
    orgaos[a] > orgaos[b] ? a : b
  )
  const orgaoMaisRepassesSucesso = Object.keys(orgaosSucesso).reduce((a, b) =>
    orgaosSucesso[a] > orgaosSucesso[b] ? a : b
  )
  const orgaoMaisRepassesFalha = Object.keys(orgaosFalha).reduce((a, b) =>
    orgaosFalha[a] > orgaosFalha[b] ? a : b
  )
  const motivoFalhaMaisRepasses = Object.keys(motivosFalha).reduce((a, b) =>
    motivosFalha[a] > motivosFalha[b] ? a : b
  )

  console.log('Detalhes do repasse com maior valor:', maiorValor)
  console.log('Detalhes do repasse com menor valor:', menorValor)
  console.log('Dia com mais repasses:', diaMaisRepasses)
  console.log('Órgão com mais repasses:', orgaoMaisRepasses)
  console.log(
    'Órgão com mais repasses bem-sucedidos:',
    orgaoMaisRepassesSucesso
  )
  console.log('Órgão com mais repasses falhados:', orgaoMaisRepassesFalha)
  console.log('Motivo de falha com mais repasses:', motivoFalhaMaisRepasses)
}

function apresentarDetalhesPorOrgao(repasses, orgaoFiltro) {
  const detalhes = repasses.filter(r => r.orgao === orgaoFiltro)
  console.log(`Detalhes das transações para o órgão ${orgaoFiltro}:`, detalhes)
}

function tratamentoDeErros(repasses) {
  const erros = repasses.filter(r => r.status === 'falha' && !r.motivo)
  console.log('Detalhes das transações com falha e sem motivo:', erros)
}

function ajustarEstatisticas(repasses) {
  const validos = repasses.filter(
    r => r.status === 'sucesso' || (r.status === 'falha' && r.motivo)
  )
  exibirTotalRepasses(validos)
  analisarTransacoes(validos)
  exibirEstatisticas(validos)
}

exibirTotalRepasses(repasses)
analisarTransacoes(repasses)
exibirEstatisticas(repasses)
apresentarDetalhesPorOrgao(repasses, 'MEC')
tratamentoDeErros(repasses)
ajustarEstatisticas(repasses)
