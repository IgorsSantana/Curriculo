import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PortfolioDashboard.module.css'
import DataGraphBackground from './DataGraphBackground'
import ScrollIndicator from './ScrollIndicator'
import ProgressNavigation from './ProgressNavigation'
import ProjectModal from './ProjectModal'
import LazyIframe from './LazyIframe'
import perfilWebP from '../perfil.webp'
import perfilPNG from '../perfil.png'

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const PortfolioDashboard = () => {
  // Estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  // Função para abrir o modal de imagem
  const openImageModal = () => {
    console.log('🖼️ Abrindo modal de imagem')
    setIsImageModalOpen(true)
  }

  // Função para fechar o modal de imagem
  const closeImageModal = () => {
    console.log('❌ Fechando modal de imagem')
    setIsImageModalOpen(false)
  }

  // Debug: monitorar mudanças no estado do modal de imagem
  useEffect(() => {
    console.log('🔄 Estado do modal de imagem mudou:', isImageModalOpen)
  }, [isImageModalOpen])

  // Debug: monitorar visibilidade da seção About
  useEffect(() => {
    const checkAboutVisibility = () => {
      if (aboutRef.current) {
        const styles = window.getComputedStyle(aboutRef.current)
        console.log('📊 SEÇÃO ABOUT:', {
          opacity: styles.opacity,
          pointerEvents: styles.pointerEvents,
          zIndex: styles.zIndex,
          display: styles.display
        })
      }
    }
    
    // Verificar após 3 segundos (tempo para animações GSAP)
    const timer = setTimeout(checkAboutVisibility, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Refs para os elementos que serão animados
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const projeto1Ref = useRef(null)
  const projeto2Ref = useRef(null)
  const projeto3Ref = useRef(null)
  const contatoRef = useRef(null)

  // Refs para widgets individuais do hero
  const widget1Ref = useRef(null)
  const widget2Ref = useRef(null)
  const widget3Ref = useRef(null)
  const heroTitleRef = useRef(null)

  // Refs para transição de dados
  const dataTransitionRef = useRef(null)
  const dataFogRef = useRef(null)

  // Refs para iframes dos projetos
  const iframe1Ref = useRef(null)
  const iframe2Ref = useRef(null)
  const iframe3Ref = useRef(null)

  // Dados dos projetos (documentação será preenchida depois)
  const projects = {
    projeto1: {
      icon: '📊',
      title: 'Dashboard de Análise de Vendas',
      documentation: (
        <>
          <h2>🎯 Objetivo Principal</h2>
          <p>
            Este dashboard foi desenvolvido para fornecer uma <strong>análise de performance de vendas</strong>, 
            com foco em faturamento, lucro e volume. O objetivo é permitir que gestores e compradores 
            identifiquem tendências de consumo, sazonalidade de produtos/seções e o desempenho detalhado 
            de itens individuais, auxiliando na tomada de decisões estratégicas de compra e precificação.
          </p>

          <h2>👥 Público-Alvo</h2>
          <ul>
            <li><strong>Diretoria:</strong> Para uma visão macro da saúde financeira (faturamento, lucro).</li>
            <li><strong>Gestores Comerciais:</strong> Para monitorar a performance das seções e o crescimento anual.</li>
            <li><strong>Compradores:</strong> Para análises granulares de produtos, ranking e sazonalidade.</li>
          </ul>

          <h2>🔍 Filtros e Interatividade</h2>
          <p>
            O dashboard é <strong>totalmente interativo</strong>. O usuário pode filtrar todas as páginas 
            pelos seguintes critérios:
          </p>
          <ul>
            <li><strong>DATA:</strong> Permite selecionar um período específico para análise.</li>
            <li><strong>SEÇÃO:</strong> Filtra o relatório para visualizar apenas seções específicas (ex: Açougue, Hortifruti).</li>
            <li><strong>COMPRADOR:</strong> Analisa a performance dos produtos gerenciados por um comprador específico.</li>
            <li><strong>LOJA:</strong> Isola os dados de uma ou mais lojas.</li>
          </ul>

          <h2>📊 Página "Início" (Visão Executiva)</h2>
          <p>Esta página oferece um resumo gerencial (visão macro) da performance de vendas.</p>

          <h3>📈 Cartões de KPIs (Indicadores-Chave)</h3>
          <ul>
            <li>
              <strong>Total Volume:</strong> Mostra a quantidade total de itens vendidos no período filtrado.
            </li>
            <li>
              <strong>Total Faturamento:</strong> Exibe a receita total. O indicador (▼ 0,35%) compara o 
              faturamento com o mesmo período do ano anterior.
            </li>
            <li>
              <strong>Total Lucro:</strong> Exibe o lucro total. O indicador (▼ 6,24%) compara o lucro 
              com o mesmo período do ano anterior.
            </li>
          </ul>

          <h3>📊 Gráficos Principais</h3>
          
          <h4>Evolução Faturamento</h4>
          <ul>
            <li>
              <strong>O que faz:</strong> Um gráfico de linha e área que monitora o faturamento mês a mês.
            </li>
            <li>
              <strong>Contexto:</strong> Compara a linha de faturamento do ano atual (linha vermelha) com 
              os 3 anos anteriores, além de mostrar uma linha de média e uma de máximo.
            </li>
            <li>
              <strong>Insight:</strong> Essencial para identificar tendências, sazonalidade e se o faturamento 
              atual está acima ou abaixo do histórico.
            </li>
          </ul>

          <h4>Faturamento e Lucro por Seção</h4>
          <ul>
            <li>
              <strong>O que faz:</strong> Um gráfico de barras que detalha o faturamento (barra escura) e 
              o lucro (barra vermelha) para as principais seções.
            </li>
            <li>
              <strong>Insight:</strong> Permite identificar rapidamente quais seções geram mais receita 
              (ex: Açougue) e quais são mais lucrativas.
            </li>
          </ul>

          <h4>Participação Faturamento por Ano</h4>
          <ul>
            <li>
              <strong>O que faz:</strong> Um gráfico de rosca que mostra a fatia de participação do faturamento 
              de cada ano (ano atual e os 3 anteriores) no total do período analisado.
            </li>
            <li>
              <strong>Insight:</strong> Ajuda a contextualizar o crescimento ou retração da empresa ao longo dos anos.
            </li>
          </ul>

          <h2>🔬 Página "Detalhes" (Visão Analítica)</h2>
          <p>Esta página permite uma análise granular, focada na sazonalidade e no ranking de produtos.</p>

          <h3>🗓️ Matriz de Sazonalidade (Faturamento por Seção/Mês)</h3>
          <ul>
            <li>
              <strong>O que faz:</strong> Uma matriz (tabela) que cruza as Seções (linhas) com os Meses (colunas). 
              Os valores na tabela são o faturamento.
            </li>
            <li>
              <strong>Insight:</strong> É a principal ferramenta para identificar sazonalidade. Fica claro quais 
              seções têm picos de venda em quais meses (ex: "Bebidas" pode crescer no verão, "Hortifruti" se mantém estável).
            </li>
          </ul>

          <h3>🏆 TOP 100 Produtos (Ranking Ponderado)</h3>
          <ul>
            <li>
              <strong>O que faz:</strong> Esta tabela classifica os 100 produtos principais com base em uma 
              pontuação ponderada.
            </li>
            <li>
              <strong>Lógica do Rank:</strong> O Rank (1, 2, 3...) não se baseia apenas em uma métrica, 
              mas sim em uma pontuação que combina Faturamento, Lucro e Volume, com um peso maior para o Lucro.
            </li>
            <li>
              <strong>Insight:</strong> Identifica os produtos "campeões" — aqueles que equilibram alto faturamento, 
              boa margem de lucro e alto giro.
            </li>
          </ul>

          <h3>🥇 Rank Seções</h3>
          <ul>
            <li>
              <strong>O que faz:</strong> Uma tabela simples que classifica as seções da mais importante para 
              a menos importante, com base no faturamento do período.
            </li>
            <li>
              <strong>Insight:</strong> Oferece uma visão clara de qual seção tem o maior impacto na receita total.
            </li>
          </ul>

          <hr />

          <h2>✨ Destaques Técnicos</h2>
          <ul>
            <li>📊 Comparação Year-over-Year (YoY) automática</li>
            <li>🔄 Filtros dinâmicos interligados</li>
            <li>📈 Análise temporal de 4 anos</li>
            <li>🎯 Ranking ponderado inteligente</li>
            <li>🗓️ Matriz de sazonalidade visual</li>
          </ul>
        </>
      )
    },
    projeto2: {
      icon: '✅',
      title: 'Dashboard de Checklists Operacionais',
      documentation: (
        <>
          <h2>🎯 Objetivo Principal</h2>
          <p>
            Monitorar em tempo real a <strong>Execução</strong> (se os checklists obrigatórios foram feitos) 
            e a <strong>Qualidade</strong> (a pontuação obtida) das rotinas operacionais do Supermercado Santo Antonio.
          </p>

          <h2>💡 O Conceito Central: KPI de Performance Real (% Pontuação)</h2>
          <p>
            O principal indicador do dashboard, o <strong>% Pontuação</strong>, não é uma média simples. 
            Ele é um KPI de performance que reflete a realidade operacional com base em um cálculo de 
            <strong>Pontos Obtidos vs. Pontos Possíveis</strong>.
          </p>

          <h3>🔢 Como Funciona</h3>
          <p>
            Cada formulário tem uma <strong>"Meta Diária"</strong> de preenchimento 
            (ex: Checklist Açougue = 2 vezes/dia).
          </p>
          <ul>
            <li>
              <strong>Pontos Possíveis:</strong> Se a meta do Açougue é 2, o total de pontos possíveis 
              é 200 (2 × 100).
            </li>
            <li>
              <strong>Pontos Obtidos:</strong> É a soma da pontuação dos formulários preenchidos.
            </li>
          </ul>

          <h3>📋 Exemplo Prático</h3>
          <p>Se 1 checklist do Açougue for preenchido com nota 100 e o outro for esquecido:</p>
          <ul>
            <li>❌ O cálculo <strong>não é</strong> 100 / 1 = 100%.</li>
            <li>✅ O cálculo <strong>real é</strong> 100 / 200 = 50%.</li>
          </ul>
          <p>
            <strong>Resultado:</strong> O esquecimento ou falha na execução de um checklist obrigatório 
            é automaticamente penalizado, fazendo com que o indicador caia. Uma nota alta (ex: 85%) 
            significa que a operação rodou com <strong>alta qualidade E alta execução</strong>.
          </p>

          <h2>📊 O Coração do Dashboard: A Matriz de Status de Preenchimento</h2>
          <p>
            Esta matriz é a principal ferramenta de gestão diária. Ela não mostra a pontuação, 
            mas sim o <strong>status de execução</strong>.
          </p>

          <h3>🎨 Lógica de Cores e Status</h3>
          <ul>
            <li>
              <strong>🟢 Completo (Verde):</strong> A meta de preenchimento do dia foi atingida ou superada.
            </li>
            <li>
              <strong>🟡 Incompleto (X) (Amarelo):</strong> O checklist foi iniciado, mas não foi feito 
              o número de vezes estipulado pela meta. O número (X) mostra quantos faltaram.
            </li>
            <li>
              <strong>🔴 Pendente (Vermelho):</strong> A meta existia, mas nenhum formulário foi preenchido. 
              Este é o alerta mais crítico.
            </li>
            <li>
              <strong>⚪ N/A (Branco/Cinza):</strong> O formulário não tem uma meta diária definida para 
              aquele dia (ex: checklists de campanhas sazonais).
            </li>
          </ul>

          <h3>🏢 Lógica do Total (Loja)</h3>
          <p>
            A linha de total da loja sempre reflete o <strong>status mais urgente</strong>. 
            Se um único formulário estiver "Pendente", o status da loja inteira será "Pendente".
          </p>
          <p>
            <strong>Hierarquia:</strong> Pendente {'>'}  Incompleto {'>'} Completo
          </p>

          <h2>📈 Principais Visuais e Análises</h2>

          <h3>📊 KPIs Globais</h3>
          <ul>
            <li>
              <strong>% Pontuação:</strong> Visão geral da performance (qualidade + execução).
            </li>
            <li>
              <strong>Formulários Feitos:</strong> Volume de trabalho executado.
            </li>
          </ul>

          <h3>🏪 Média Pontuação por Loja</h3>
          <p>
            Usa o <strong>% Pontuação Real</strong>. Permite identificar rapidamente quais lojas 
            estão com a performance mais baixa, já considerando as penalidades por não preenchimento.
          </p>

          <h3>📝 % Pontuação por Formulário</h3>
          <p>
            Identifica quais processos (formulários) estão com a performance mais baixa.
          </p>

          <h3>👥 Top 5 Menores Pontuações por Responsáveis</h3>
          <p>
            Mostra os responsáveis cuja média de performance (qualidade + execução) está mais baixa, 
            indicando quem pode precisar de mais treinamento ou suporte.
          </p>

          <h3>📉 % Pontuação por Dia (Gráfico de Linha)</h3>
          <p>
            Mostra a <strong>tendência da performance real</strong> ao longo do tempo. 
            Quedas bruscas neste gráfico indicam dias em que checklists importantes foram esquecidos.
          </p>

          <h3>⚠️ % por Departamento com Restrições</h3>
          <p>
            Analisa o resultado <strong>"Aprovado com Restrições"</strong>. Mostra quais departamentos, 
            mesmo sendo aprovados, o fazem com mais ressalvas, indicando oportunidades de melhoria.
          </p>

          <h2>🗄️ Modelo de Dados (A Lógica por Trás)</h2>
          <p>O sistema funciona com base na relação entre 3 tabelas principais:</p>

          <h3>📋 fRealizacoes (Fatos)</h3>
          <p>
            A tabela principal que contém todos os <strong>formulários preenchidos</strong>, 
            suas notas e respostas.
          </p>

          <h3>🎯 dMetasFormularios (Dimensão)</h3>
          <p>
            A tabela "mestra" que criamos. É ela quem <strong>define as regras do jogo</strong>, 
            informando ao Power BI qual é a meta diária para cada formulário.
          </p>

          <h3>📅 dCalendario (Dimensão)</h3>
          <p>
            A tabela de datas, que permite as análises ao longo do tempo e a remoção de dias 
            não úteis (como domingos) dos cálculos.
          </p>

          <hr />

          <h2>✨ Destaques Técnicos</h2>
          <ul>
            <li>🎯 KPI com penalização automática por não-execução</li>
            <li>🚦 Sistema de status hierárquico (Pendente {'>'} Incompleto {'>'} Completo)</li>
            <li>📊 Matriz visual de status em tempo real</li>
            <li>⚡ Alertas automáticos de urgência</li>
            <li>📈 Análise de tendência temporal</li>
            <li>🏆 Ranking de responsáveis por performance</li>
          </ul>
        </>
      )
    },
    projeto3: {
      icon: '📉',
      title: 'Dashboard de Controle de Perdas',
      documentation: (
        <>
          <h2>🎯 Visão Geral e Objetivo</h2>
          <p>
            O dashboard "Controle de Perdas" foi projetado para monitorar a <strong>eficiência operacional</strong> 
            e o <strong>impacto financeiro</strong> das perdas de produtos.
          </p>
          <p>
            Seu objetivo principal não é apenas medir a perda, mas <strong>contextualizá-la</strong>. 
            Ele faz isso ao comparar a quantidade de produtos perdidos em um período com a quantidade de 
            produtos vendidos no período imediatamente anterior. Isso o transforma de um simples relatório 
            de perdas em uma poderosa ferramenta de análise de eficiência.
          </p>

          <h3>👥 Público-Alvo</h3>
          <ul>
            <li>Gerentes de loja</li>
            <li>Líderes de setor (especialmente açougue e perecíveis)</li>
            <li>Equipe de prevenção de perdas</li>
          </ul>

          <h2>🔍 Como Usar: Filtros Interativos</h2>
          <p>
            Os filtros no painel esquerdo controlam todos os visuais do relatório, permitindo análises 
            desde o nível mais alto (empresa inteira) até o mais detalhado (um único produto ou loja).
          </p>
          <ul>
            <li>
              <strong>DATA:</strong> Permite selecionar o período de análise. A maioria dos cálculos 
              do dashboard é baseada em semanas (ex: 02/nov/25 a 08/nov/25).
            </li>
            <li>
              <strong>LOJA:</strong> Filtra os dados para uma loja específica ou mostra o consolidado de "Todos".
            </li>
            <li>
              <strong>GRUPO:</strong> Permite focar a análise em um grupo de produtos específico 
              (ex: "Bovino", "Suíno").
            </li>
          </ul>

          <h2>📊 Indicadores Principais (KPIs)</h2>
          <p>A seção superior apresenta os números mais importantes para uma visão rápida.</p>

          <h3>📦 Qtd. Vendida Semana Anterior</h3>
          <p>
            <strong>Exemplo:</strong> 20.006 unidades<br />
            Este é o seu <strong>baseline</strong>. É a quantidade total de itens vendidos na semana 
            anterior ao período selecionado no filtro.
          </p>

          <h3>📉 Qtd. Perdida</h3>
          <p>
            <strong>Exemplo:</strong> 2.056 unidades<br />
            A quantidade total de itens perdidos no período atual selecionado.
          </p>

          <h3>💰 Lucro e Valor Perdido</h3>
          <p>Mostra o <strong>impacto financeiro</strong>:</p>
          <ul>
            <li><strong>Lucro:</strong> R$ 68.117 (lucro bruto do período)</li>
            <li><strong>Valor Perdido:</strong> R$ 32.607 (custo total das perdas)</li>
          </ul>

          <h3>💵 Faturamento</h3>
          <p>
            <strong>Exemplo:</strong> R$ 405.076,99<br />
            O valor total de vendas (faturamento) no período selecionado.
          </p>

          <h3>📈 Margem vs. Margem Real</h3>
          <ul>
            <li>
              <strong>Margem (16,83%):</strong> É a margem de lucro padrão (Lucro / Faturamento).
            </li>
            <li>
              <strong>Margem Real (8,78%):</strong> Este é um KPI crucial. Ele recalcula sua margem 
              subtraindo as perdas: <code>(Lucro - Valor Perdido) / Faturamento</code>. 
              Mostra o quanto a perda realmente "comeu" da sua lucratividade.
            </li>
          </ul>

          <h3>🎯 % Perda × Venda Semana Anterior</h3>
          <p>
            <strong>Exemplo:</strong> 10,28%<br />
            Este é o <strong>KPI principal</strong> do seu dashboard. Ele é o resultado da divisão:
          </p>
          <p style={{textAlign: 'center', padding: '16px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '8px', margin: '16px 0'}}>
            <strong>[Qtd. Perdida] / [Qtd. Vendida Semana Anterior]</strong><br />
            2.056 / 20.006 = 10,28%
          </p>

          <h2>📊 Análises Detalhadas (Gráficos e Tabela)</h2>

          <h3>📋 Análise Detalhada de Vendas e Perdas (Tabela Central)</h3>
          <p>Esta é a visão mais granular, onde você pode identificar os produtos exatos que causam o problema.</p>
          <ul>
            <li><strong>DESCRIÇÃO:</strong> Mostra os produtos, agrupados por hierarquia.</li>
            <li><strong>Qtd Perdida (Dom-Sex):</strong> Quantidade perdida do item, seguindo a regra de Domingo a Sexta.</li>
            <li><strong>Qtd Vendida Semana Anterior (Seg-Dom):</strong> Quantidade vendida na semana anterior (Segunda a Domingo).</li>
            <li>
              <strong>% Perda × Venda Semana Anterior:</strong> Aplica o KPI principal a cada produto. 
              A formatação condicional (🟢 verde, 🟡 amarelo, 🔴 vermelho) destaca automaticamente os 
              produtos mais problemáticos (ex: "COPA LOMBO SUINO KG" com 285,54% = perda muito superior à venda).
            </li>
          </ul>

          <h3>📈 Qtd. Perdida por Semana (Gráfico de Linha)</h3>
          <p>Este gráfico mostra a <strong>tendência das perdas</strong>.</p>
          <ul>
            <li><strong>Eixo X:</strong> Períodos de semana (ex: 05/out - 11/out)</li>
            <li><strong>Eixo Y:</strong> Quantidade total perdida</li>
            <li>
              <strong>Como ler:</strong> Permite identificar rapidamente se as ações de controle estão 
              surtindo efeito (linha descendo) ou se há um problema crescente (linha subindo).
            </li>
          </ul>

          <h3>💸 Valor Perdido por Subgrupo (Gráfico de Barras)</h3>
          <p>Este gráfico mostra <strong>onde o dinheiro está sendo perdido</strong>.</p>
          <ul>
            <li><strong>Eixo X:</strong> Subgrupos de produtos (ex: "Aves resfriada", "Bovino", "Suíno")</li>
            <li><strong>Eixo Y:</strong> Valor total (em R$) da perda</li>
            <li>
              <strong>Como ler:</strong> Aponta qual subgrupo tem o maior impacto financeiro nas perdas, 
              ajudando a priorizar ações. (ex: "Suíno" é o maior ofensor)
            </li>
          </ul>

          <h2>🧠 Lógica de Negócio (O "Cérebro" do Dashboard)</h2>
          <p>
            O funcionamento deste dashboard é baseado nas <strong>medidas DAX personalizadas</strong>, 
            que seguem regras de negócio específicas para tornar a análise mais justa e precisa.
          </p>

          <h3>🔄 Comparação Deslocada</h3>
          <p>
            O dashboard <strong>intencionalmente não compara</strong> a perda da semana atual com a venda 
            da semana atual. Fazer isso criaria distorções (ex: uma semana de venda baixa faria a % de 
            perda parecer artificialmente enorme).
          </p>

          <h3>📅 Períodos Customizados</h3>
          <p>Para calcular o KPI principal, o dashboard usa duas medidas com períodos de tempo customizados:</p>
          <ul>
            <li>
              <strong>Perdas (Qtd Perdida Dom-Sex):</strong> Soma a quantidade perdida de 
              <strong>Domingo até Sexta-feira</strong> da semana selecionada.
            </li>
            <li>
              <strong>Vendas (Qtd Vendida Semana Anterior Seg-Dom):</strong> Soma a quantidade vendida de 
              <strong>Segunda-feira até Domingo</strong> da semana anterior à selecionada.
            </li>
          </ul>
          <p>
            Essa lógica garante que você esteja sempre comparando uma "produção de perda" (Dom-Sex) 
            com uma "base de venda" sólida e completa da semana anterior (Seg-Dom).
          </p>

          <hr />

          <h2>✨ Destaques Técnicos</h2>
          <ul>
            <li>🎯 Contextualização inteligente: perda vs. venda período anterior</li>
            <li>💰 Margem Real: impacto financeiro real das perdas</li>
            <li>📅 Períodos customizados (Dom-Sex vs. Seg-Dom semana anterior)</li>
            <li>🎨 Formatação condicional automática (verde, amarelo, vermelho)</li>
            <li>📊 Análise granular por produto</li>
            <li>📈 Tendência temporal de perdas</li>
            <li>💸 Priorização por impacto financeiro (R$)</li>
          </ul>
        </>
      )
    }
  }

  // Função para abrir modal
  const openModal = (projectKey) => {
    setSelectedProject(projects[projectKey])
    setIsModalOpen(true)
  }

  // Função para fechar modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  useLayoutEffect(() => {
    // Contexto do GSAP para facilitar cleanup
    const ctx = gsap.context(() => {
      
      // Animar contadores de números
      const animateCounter = (element) => {
        if (!element) return
        const target = parseInt(element.getAttribute('data-target'))
        gsap.to(element, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power1.out'
        })
      }
      
      const counters = document.querySelectorAll(`.${styles.valueCounter}`)
      counters.forEach(counter => animateCounter(counter))
      
      // Garantir que Hero está visível no início
      gsap.set(heroRef.current, { opacity: 1 })
      gsap.set(aboutRef.current, { opacity: 0, y: 50 })
      gsap.set(projeto1Ref.current, { opacity: 0, scale: 0.9 })
      gsap.set(projeto2Ref.current, { opacity: 0, x: '100%' })
      gsap.set(projeto3Ref.current, { opacity: 0, x: '100%' })
      gsap.set(dataTransitionRef.current, { opacity: 0 })
      
      // Debug da névoa
      if (dataFogRef.current) {
        console.log('✅ Névoa de dados encontrada:', dataFogRef.current)
        console.log('📊 Partículas na névoa:', dataFogRef.current.querySelectorAll(`.${styles.fogParticle}`).length)
        gsap.set(dataFogRef.current, { opacity: 0 })
      } else {
        console.error('❌ dataFogRef NÃO encontrada!')
      }
      
      // ==========================================
      // TIMELINE MESTRE: Todas as transições em sequência
      // ==========================================
      
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=9000', // 9000px de scroll total (Hero → About → 3 projetos)
          scrub: 1, // Animação sincronizada com o scroll
          pin: true, // Fixa o container durante o scroll
          anticipatePin: 1,
          markers: false // Mude para true para debug visual
        }
      })

      // ==========================================
      // PARTE 1: Hero → About (0 a 2s da timeline)
      // ==========================================
      
      // Fade out do título hero
      masterTimeline.to(heroTitleRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8
      }, 0)

      // Fade out dos widgets periféricos
      masterTimeline.to([widget1Ref.current, widget2Ref.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.8
      }, 0)

      // Widget 3 expande e faz transição
      masterTimeline.to(widget3Ref.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1
      }, 0.4)

      // ==========================================
      // TRANSIÇÃO DE DADOS (0.6s a 1.8s)
      // ==========================================
      
      // Fade in da camada de transição
      masterTimeline.to(dataTransitionRef.current, {
        opacity: 1,
        duration: 0.5
      }, 0.6)

      // Animar gráficos de barras atravessando a tela
      masterTimeline.fromTo(`.${styles.transitionBar}`, 
        {
          y: '100vh' // Começam abaixo da tela
        },
        {
          y: '-100vh', // Terminam acima da tela
          stagger: 0.06,
          duration: 0.8,
          ease: 'power1.inOut'
        }, 0.8)

      // Animar números flutuantes
      masterTimeline.to(`.${styles.floatingData}`, {
        opacity: 1,
        y: -30,
        stagger: 0.05,
        duration: 0.6
      }, 1)

      // Fade out da transição de dados
      masterTimeline.to(dataTransitionRef.current, {
        opacity: 0,
        duration: 0.5
      }, 1.5)

      // ==========================================
      // FIM DA TRANSIÇÃO: Mostrar About
      // ==========================================

      // Fade out completo do hero
      masterTimeline.to(heroRef.current, {
        opacity: 0,
        duration: 0.8
      }, 1.2)

      // Fade in do About
      masterTimeline.to(aboutRef.current, {
        opacity: 1,
        y: 0,
        duration: 1
      }, 2)

      // Pausa no About
      masterTimeline.to({}, { duration: 1 }, 3)

      // ==========================================
      // PARTE 2: About → Projeto 1 (4s a 6.5s)
      // COM NÉVOA DE DADOS
      // ==========================================

      // 1. About começa a desaparecer + blur
      masterTimeline.to(aboutRef.current, {
        opacity: 0.5,
        filter: 'blur(5px)',
        scale: 0.95,
        duration: 0.6
      }, 4)

      // 2. Névoa de dados aparece
      masterTimeline.to(dataFogRef.current, {
        opacity: 1,
        duration: 0.5,
        onStart: () => console.log('💫 Névoa aparecendo!'),
        onComplete: () => console.log('✅ Névoa visível (opacity: 1)')
      }, 4.3)

      // 3. Partículas de dados se movem
      masterTimeline.to(`.${styles.fogParticle}`, {
        y: 'random(-200, 200)',
        x: 'random(-100, 100)',
        opacity: 1,
        stagger: 0.02,
        duration: 0.8,
        ease: 'power2.out',
        onStart: () => {
          const particulas = document.querySelectorAll(`.${styles.fogParticle}`)
          console.log('💥 Partículas encontradas:', particulas.length)
        }
      }, 4.4)

      // 4. About desaparece completamente
      masterTimeline.to(aboutRef.current, {
        opacity: 0,
        duration: 0.3
      }, 4.8)

      // 5. Névoa atinge pico de intensidade
      masterTimeline.to(dataFogRef.current, {
        opacity: 0.9,
        duration: 0.2
      }, 5)

      // 6. Névoa começa a se dissipar
      masterTimeline.to(`.${styles.fogParticle}`, {
        opacity: 0,
        y: '+=100',
        stagger: 0.01,
        duration: 0.6,
        ease: 'power2.in'
      }, 5.3)

      // 7. Projeto 1 aparece através da névoa
      masterTimeline.to(projeto1Ref.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8
      }, 5.5)

      // 8. Névoa desaparece completamente
      masterTimeline.to(dataFogRef.current, {
        opacity: 0,
        duration: 0.4
      }, 5.8)

      // Pausa no Projeto 1
      masterTimeline.to({}, { duration: 1 }, 6.5)

      // ==========================================
      // PARTE 3: Projeto 1 → Projeto 2 (7.5s a 9s)
      // ==========================================
      
      // Slide horizontal: Projeto 1 sai pela esquerda
      masterTimeline.to(projeto1Ref.current, {
        x: '-100%',
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      }, 6.5)

      // Projeto 2 entra pela direita
      masterTimeline.to(projeto2Ref.current, {
        x: '0%',
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut'
        }, 7.5) // Mesmo tempo = acontecem juntos

      // Pausa no Projeto 2
      masterTimeline.to({}, { duration: 1 }, 9)

      // ==========================================
      // PARTE 4: Projeto 2 → Projeto 3 (10s a 11.5s)
      // ==========================================
      
      // Slide horizontal: Projeto 2 sai pela esquerda
      masterTimeline.to(projeto2Ref.current, {
        x: '-100%',
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      }, 9)

      // Projeto 3 entra pela direita
      masterTimeline.to(projeto3Ref.current, {
        x: '0%',
        opacity: 1,
        duration: 1.5,
        ease: 'power2.inOut'
        }, 10) // Mesmo tempo = acontecem juntos

      // Pausa no Projeto 3
      masterTimeline.to({}, { duration: 1 }, 11.5)

    }, containerRef)

    // Cleanup: importante para evitar memory leaks
    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      {/* Fundo com gráfico de dados animado */}
      <DataGraphBackground />
      
      {/* Indicador de scroll */}
      <ScrollIndicator />
      
      {/* Navegação por progresso (rodapé) */}
      <ProgressNavigation />
      
      {/* Container Principal (Pinado) */}
      <div ref={containerRef} className={styles.pinContainer}>
        
        {/* NÉVOA DE DADOS (About → Projeto 1) */}
        <div ref={dataFogRef} className={styles.dataFog}>
          {/* Partículas de código/dados flutuantes */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div 
              key={i} 
              className={styles.fogParticle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {[
                '87.5%', '+2.4K', '156', '99.2%', '0xF3A', 
                '42M', '3.4K', '78%', '521', 'SQL', 
                'DAX', 'ETL', '100K', '∑', 'Δ',
                '◊', '∞', '≈', '≠', '±'
              ][i % 20]}
            </div>
          ))}
          
          {/* Linhas de código passando */}
          <div className={styles.codeLines}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.codeLine}>
                {'{'} SELECT * FROM analytics WHERE value {'>'}  0 {'}'}
              </div>
            ))}
          </div>
        </div>

        {/* CAMADA DE TRANSIÇÃO DE DADOS */}
        <div ref={dataTransitionRef} className={styles.dataTransitionLayer}>
          {/* Números flutuantes */}
          <div className={styles.floatingData} style={{ top: '15%', left: '10%' }}>
            <span className={styles.dataValue}>87.5%</span>
            <span className={styles.dataLabel}>EFICIÊNCIA</span>
          </div>
          <div className={styles.floatingData} style={{ top: '25%', right: '15%' }}>
            <span className={styles.dataValue}>+34K</span>
            <span className={styles.dataLabel}>REGISTROS</span>
          </div>
          <div className={styles.floatingData} style={{ top: '65%', left: '20%' }}>
            <span className={styles.dataValue}>2.4M</span>
            <span className={styles.dataLabel}>LINHAS</span>
          </div>
          <div className={styles.floatingData} style={{ top: '70%', right: '25%' }}>
            <span className={styles.dataValue}>99.2%</span>
            <span className={styles.dataLabel}>PRECISÃO</span>
          </div>
          <div className={styles.floatingData} style={{ top: '40%', left: '50%' }}>
            <span className={styles.dataValue}>15</span>
            <span className={styles.dataLabel}>PROJETOS</span>
          </div>

          {/* Gráficos de barras animados - atravessam a tela */}
          <div className={styles.barChartContainer}>
            <div className={styles.barGroup}>
              <div className={styles.transitionBar}></div>
            </div>
            <div className={styles.barGroup}>
              <div className={styles.transitionBar}></div>
            </div>
            <div className={styles.barGroup}>
              <div className={styles.transitionBar}></div>
            </div>
            <div className={styles.barGroup}>
              <div className={styles.transitionBar}></div>
            </div>
            <div className={styles.barGroup}>
              <div className={styles.transitionBar}></div>
            </div>
            <div className={styles.barGroup}>
              <div className={styles.transitionBar}></div>
            </div>
            <div className={styles.barGroup}>
              <div className={styles.transitionBar}></div>
            </div>
            <div className={styles.barGroup}>
              <div className={styles.transitionBar}></div>
            </div>
          </div>

          {/* Linhas de conexão de dados */}
          <svg className={styles.dataLines} viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="10" y1="20" x2="90" y2="70" className={styles.dataLine} />
            <line x1="20" y1="60" x2="80" y2="30" className={styles.dataLine} />
            <line x1="30" y1="80" x2="70" y2="15" className={styles.dataLine} />
          </svg>
        </div>
        
        {/* SEÇÃO 1: HERO/DASHBOARD PRINCIPAL */}
        <section ref={heroRef} className={styles.heroSection}>
          {/* Grid de dados no fundo */}
          <div className={styles.dataGridOverlay}></div>
          
          <div className={styles.dashboardGrid}>
            
            <h1 ref={heroTitleRef} className={styles.heroTitle}>
              <span className={styles.dataLabel}>VISUALIZAÇÃO DE DADOS</span>
              Dashboard de Carreira de <span className={styles.highlight}>Igor Silva Santana</span>
              <div className={styles.scanLine}></div>
            </h1>

            {/* Widgets do Dashboard */}
            <div ref={widget1Ref} className={`${styles.widget} ${styles.widget1}`}>
              <div className={styles.widgetHeader}>
                <span className={styles.widgetDot}></span>
                <span className={styles.widgetCode}>DATA_001</span>
              </div>
              <div className={styles.widgetIcon}>📊</div>
              <div className={styles.widgetLabel}>Projetos Concluídos</div>
              <div className={styles.widgetValue}>
                <span className={styles.valueCounter} data-target="15">0</span>
              </div>
              <div className={styles.miniGraph}>
                <div className={styles.graphBar} style={{height: '40%'}}></div>
                <div className={styles.graphBar} style={{height: '70%'}}></div>
                <div className={styles.graphBar} style={{height: '90%'}}></div>
                <div className={styles.graphBar} style={{height: '100%'}}></div>
              </div>
            </div>

            <div ref={widget2Ref} className={`${styles.widget} ${styles.widget2}`}>
              <div className={styles.widgetHeader}>
                <span className={styles.widgetDot}></span>
                <span className={styles.widgetCode}>TOOLS_SET</span>
              </div>
              <div className={styles.widgetIcon}>🛠️</div>
              <div className={styles.widgetLabel}>Ferramentas</div>
              <div className={styles.widgetValue}>Power BI, SQL, Python</div>
              <div className={styles.techBadges}>
                <span className={styles.techBadge}>PowerBI</span>
                <span className={styles.techBadge}>SQL</span>
                <span className={styles.techBadge}>Python</span>
              </div>
            </div>

            <div ref={widget3Ref} className={`${styles.widget} ${styles.widget3}`}>
              <div className={styles.widgetHeader}>
                <span className={styles.widgetDot} style={{background: '#00ff9d'}}></span>
                <span className={styles.widgetCode}>FOCUS_BI</span>
              </div>
              <div className={styles.widgetIcon}>🎯</div>
              <div className={styles.widgetLabel}>Área de Foco</div>
              <div className={styles.widgetValue}>Business Intelligence</div>
              <div className={styles.pulseIndicator}>
                <div className={styles.pulse}></div>
                <div className={styles.pulse}></div>
                <div className={styles.pulse}></div>
              </div>
              <div className={styles.widgetSubtext}>
                <span className={styles.blinkingCursor}>▶</span> Scroll para explorar dados
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: SOBRE MIM */}
        <section 
          ref={aboutRef} 
          className={styles.aboutSection}
          onMouseEnter={() => console.log('🟢 Mouse ENTROU na seção SOBRE MIM')}
          onMouseLeave={() => console.log('🔴 Mouse SAIU da seção SOBRE MIM')}
          style={{
            pointerEvents: 'auto',
            zIndex: 2
          }}
        >
          <div 
            className={styles.aboutContent}
            onMouseEnter={() => console.log('🟢 Mouse ENTROU no aboutContent')}
          >
            
            {/* Foto de Perfil */}
            <div className={styles.profileImageContainer}>
              <div 
                className={styles.profileImageBorder}
                onClick={(e) => {
                  console.log('🎯 CLIQUE DETECTADO NA FOTO!', e.target)
                  openImageModal()
                }}
                onMouseEnter={() => console.log('🐭 Mouse entrou na foto')}
                onMouseLeave={() => console.log('🐭 Mouse saiu da foto')}
                title="Clique para ampliar"
                style={{ 
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 1000
                }}
              >
                <picture>
                  <source srcSet={perfilWebP} type="image/webp" />
                  <img 
                    src={perfilPNG} 
                    alt="Igor Santana" 
                    className={styles.profileImage}
                    style={{ pointerEvents: 'none' }}
                    loading="lazy"
                    width="100"
                    height="100"
                  />
                </picture>
              </div>
              <div className={styles.profileGlow}></div>
            </div>

            {/* Apresentação Principal */}
            <div className={styles.aboutMain}>
              <h2 className={styles.aboutGreeting}>
                Olá, eu sou <span className={styles.aboutName}>Igor Santana</span>.
              </h2>
              
              <p className={styles.aboutTagline}>
                Eu conecto a <strong>estratégia de negócios</strong> com o <strong>poder dos dados</strong>.
              </p>

              <p className={styles.aboutIntro}>
                Com 2 anos de experiência na área comercial de varejo e agora como estudante de 
                <strong> Engenharia de Software</strong>, eu não apenas entendo de tecnologia, 
                mas também compreendo os desafios de negócio que ela precisa resolver.
              </p>

              <p className={styles.aboutSpecialty}>
                Minha especialidade é <strong>transformar dados brutos em insights claros</strong> usando 
                Power BI e <strong>automatizar processos com Python</strong>, criando ferramentas que 
                geram resultados reais.
              </p>

              <p className={styles.aboutCta}>
                Convido você a explorar abaixo meus <strong>projetos de destaque</strong>, onde demonstro 
                na prática como construí soluções de BI e análise para otimizar desde a definição de 
                ofertas até o controle financeiro.
              </p>
            </div>

            {/* Sobre Mim Detalhado */}
            <div className={styles.aboutDetailed}>
              <h3 className={styles.aboutDetailedTitle}>
                <span className={styles.detailIcon}>👤</span> Sobre Mim
              </h3>
              
              <div className={styles.aboutStory}>
                <p>
                  Seja bem-vindo ao meu portfólio. Meu nome é <strong>Igor</strong>, sou estudante de 
                  <strong> Engenharia de Software</strong> e um profissional apaixonado por resolver problemas.
                </p>

                <p>
                  Minha carreira não começou com código, mas sim na <strong>linha de frente do negócio</strong>. 
                  Atuando por <strong>2 anos na área comercial e logística</strong> do Santo Antonio Supermercados, 
                  eu vivenciei na prática os desafios de gestão de estoque, a pressão por metas e a necessidade 
                  de criar ofertas rentáveis.
                </p>

                <p>
                  Foi essa vivência que me fez enxergar o <strong>poder dos dados</strong>. Por iniciativa própria, 
                  comecei a mergulhar em Business Intelligence, percebendo que poderia usar a tecnologia para 
                  otimizar os processos que eu mesmo executava.
                </p>

                <p>
                  Hoje, meu foco é ser essa <strong>ponte</strong>. Eu uso minha proficiência em 
                  <strong> Power BI</strong> para construir painéis de controladoria que dão aos gestores o 
                  poder de decisão em tempo real. Uso <strong>Python</strong> para criar automações e ferramentas 
                  que economizam tempo e aumentam a precisão das análises.
                </p>

                <p className={styles.aboutFinal}>
                  Nesta página, você encontrará alguns dos meus principais projetos. 
                  Eles não são apenas exercícios técnicos; são <strong>soluções reais</strong> para problemas 
                  de negócio que eu conheço profundamente.
                </p>

                <p className={styles.aboutClosing}>
                  Sinta-se à vontade para explorar e, se gostar do que vir, <strong>vamos nos conectar!</strong>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SEÇÃO 3: PROJETO 1 */}
        <section ref={projeto1Ref} className={styles.projectSection}>
          <div className={styles.projectContent}>
            
            {/* Container do Preview (Iframe do Power BI) */}
            <div className={styles.videoContainer}>
              <LazyIframe
                ref={iframe1Ref}
                className={styles.projectVideo}
                src="https://app.powerbi.com/reportEmbed?reportId=58efdc58-21ed-4b11-887c-ba6fdd6f9806&autoAuth=true&ctid=da49a844-e2e3-40af-86a6-c3819d704f49&filterPaneEnabled=false&navContentPaneEnabled=false"
                title="Dashboard de Análise de Vendas"
              />
              
              {/* Overlay com gradiente para legibilidade */}
              <div className={styles.videoOverlay}></div>
              
              {/* Badge de destaque */}
              <div className={styles.videoBadge}>
                <span className={styles.badgeIcon}>📊</span>
                <span>Dashboard Interativo</span>
              </div>
            </div>

            {/* Informações do Projeto */}
            <div className={styles.projectInfo}>
              <span className={styles.projectTag}>Projeto 01 • Varejo</span>
              <h2 className={styles.projectTitle}>Dashboard de Análise de Vendas</h2>
              <p className={styles.projectDescription}>
                Dashboard executivo desenvolvido para análise de performance de vendas, 
                faturamento e lucratividade. Fornece visão estratégica com matriz de 
                sazonalidade, ranking ponderado de TOP 100 produtos e comparativos YoY 
                automáticos. Criado para diretoria, gestores comerciais e compradores.
              </p>
              
              {/* Destaques do Projeto */}
              <div className={styles.projectHighlights}>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🎯</span>
                  <div>
                    <strong>3 Níveis de Análise</strong>
                    <p>Visão Executiva, Sazonalidade e Ranking</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>📈</span>
                  <div>
                    <strong>Comparação Temporal</strong>
                    <p>YoY automático com 3 anos de histórico</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🔄</span>
                  <div>
                    <strong>Filtros Dinâmicos</strong>
                    <p>Data, Seção, Comprador e Loja</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.projectTechs}>
                <span className={styles.tech}>Power BI</span>
                <span className={styles.tech}>DAX</span>
                <span className={styles.tech}>Power Query</span>
                <span className={styles.tech}>Time Intelligence</span>
              </div>

              <div className={styles.projectButtons}>
                <button 
                  onClick={() => openModal('projeto1')}
                  className={styles.projectLink}
                >
                  <span className={styles.linkIcon}>📄</span>
                  Ver Documentação
                </button>

                <button 
                  onClick={() => {
                    const iframe = iframe1Ref.current
                    if (iframe) {
                      if (iframe.requestFullscreen) {
                        iframe.requestFullscreen()
                      } else if (iframe.webkitRequestFullscreen) {
                        iframe.webkitRequestFullscreen()
                      } else if (iframe.msRequestFullscreen) {
                        iframe.msRequestFullscreen()
                      }
                    }
                  }}
                  className={styles.projectLink}
                >
                  <span className={styles.linkIcon}>⛶</span>
                  Ver em Tela Cheia
                  <span className={styles.linkArrow}>⤢</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 4: PROJETO 2 */}
        <section ref={projeto2Ref} className={styles.projectSection}>
          <div className={styles.projectContent}>
            
            {/* Container do Preview (Iframe do Power BI) */}
            <div className={styles.videoContainer}>
              <LazyIframe
                ref={iframe2Ref}
                className={styles.projectVideo}
                src="https://app.powerbi.com/reportEmbed?reportId=1b3ec5d4-562e-42ab-a387-bbd4c22215bd&autoAuth=true&ctid=da49a844-e2e3-40af-86a6-c3819d704f49&filterPaneEnabled=false&navContentPaneEnabled=false"
                title="Dashboard de Checklists Operacionais"
              />
              
              {/* Overlay com gradiente para legibilidade */}
              <div className={styles.videoOverlay}></div>
              
              {/* Badge de destaque */}
              <div className={styles.videoBadge}>
                <span className={styles.badgeIcon}>✅</span>
                <span>Monitoramento em Tempo Real</span>
              </div>
            </div>

            <div className={styles.projectInfo}>
              <span className={styles.projectTag}>Projeto 02 • Operações</span>
              <h2 className={styles.projectTitle}>Dashboard de Checklists Operacionais</h2>
              <p className={styles.projectDescription}>
                Sistema de monitoramento em tempo real de execução e qualidade das rotinas 
                operacionais. Implementa KPI de Performance Real com penalização automática 
                por não cumprimento de metas, matriz de status visual (verde/amarelo/vermelho) 
                e análise de tendências por loja, formulário e responsável.
              </p>
              
              {/* Destaques do Projeto */}
              <div className={styles.projectHighlights}>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>📊</span>
                  <div>
                    <strong>KPI de Performance Real</strong>
                    <p>Pontos Obtidos vs. Possíveis com penalização automática</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🚦</span>
                  <div>
                    <strong>Matriz de Status Visual</strong>
                    <p>Verde (Completo), Amarelo (Incompleto), Vermelho (Pendente)</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>⚡</span>
                  <div>
                    <strong>Alertas Automáticos</strong>
                    <p>Hierarquia de urgência: Pendente {'>'} Incompleto {'>'} Completo</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.projectTechs}>
                <span className={styles.tech}>Power BI</span>
                <span className={styles.tech}>DAX Avançado</span>
                <span className={styles.tech}>Modelo Relacional</span>
              </div>

              <div className={styles.projectButtons}>
                <button 
                  onClick={() => openModal('projeto2')}
                  className={styles.projectLink}
                >
                  <span className={styles.linkIcon}>📄</span>
                  Ver Documentação
                </button>

                <button 
                  onClick={() => {
                    const iframe = iframe2Ref.current
                    if (iframe) {
                      if (iframe.requestFullscreen) {
                        iframe.requestFullscreen()
                      } else if (iframe.webkitRequestFullscreen) {
                        iframe.webkitRequestFullscreen()
                      } else if (iframe.msRequestFullscreen) {
                        iframe.msRequestFullscreen()
                      }
                    }
                  }}
                  className={styles.projectLink}
                >
                  <span className={styles.linkIcon}>⛶</span>
                  Ver em Tela Cheia
                  <span className={styles.linkArrow}>⤢</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 5: PROJETO 3 */}
        <section ref={projeto3Ref} className={styles.projectSection}>
          <div className={styles.projectContent}>
            
            {/* Container do Preview (Iframe do Power BI) */}
            <div className={styles.videoContainer}>
              <LazyIframe
                ref={iframe3Ref}
                className={styles.projectVideo}
                src="https://app.powerbi.com/reportEmbed?reportId=8b191d03-92d4-4b22-92b5-5b60fe396279&autoAuth=true&ctid=da49a844-e2e3-40af-86a6-c3819d704f49&filterPaneEnabled=false&navContentPaneEnabled=false"
                title="Dashboard de Controle de Perdas"
              />
              
              {/* Overlay com gradiente para legibilidade */}
              <div className={styles.videoOverlay}></div>
              
              {/* Badge de destaque */}
              <div className={styles.videoBadge}>
                <span className={styles.badgeIcon}>📉</span>
                <span>Análise de Eficiência</span>
              </div>
            </div>

            <div className={styles.projectInfo}>
              <span className={styles.projectTag}>Projeto 03 • Gestão de Perdas</span>
              <h2 className={styles.projectTitle}>Dashboard de Controle de Perdas</h2>
              <p className={styles.projectDescription}>
                Dashboard de monitoramento de eficiência operacional que contextualiza perdas 
                através de comparação inteligente com vendas do período anterior. Implementa 
                KPI único (% Perda × Venda Semana Anterior) com períodos customizados, análise 
                de impacto financeiro (Margem vs. Margem Real) e formatação condicional 
                automática para identificação de produtos críticos.
              </p>
              
              {/* Destaques do Projeto */}
              <div className={styles.projectHighlights}>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🎯</span>
                  <div>
                    <strong>KPI Contextualizado</strong>
                    <p>Perda comparada com venda do período anterior</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>💰</span>
                  <div>
                    <strong>Margem Real vs. Margem Bruta</strong>
                    <p>Impacto financeiro real das perdas na lucratividade</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>📅</span>
                  <div>
                    <strong>Períodos Customizados</strong>
                    <p>Perdas (Dom-Sex) vs. Vendas (Seg-Dom) semana anterior</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.projectTechs}>
                <span className={styles.tech}>Power BI</span>
                <span className={styles.tech}>DAX Customizado</span>
                <span className={styles.tech}>Time Intelligence</span>
              </div>

              <div className={styles.projectButtons}>
                <button 
                  onClick={() => openModal('projeto3')}
                  className={styles.projectLink}
                >
                  <span className={styles.linkIcon}>📄</span>
                  Ver Documentação
                </button>

                <button 
                  onClick={() => {
                    const iframe = iframe3Ref.current
                    if (iframe) {
                      if (iframe.requestFullscreen) {
                        iframe.requestFullscreen()
                      } else if (iframe.webkitRequestFullscreen) {
                        iframe.webkitRequestFullscreen()
                      } else if (iframe.msRequestFullscreen) {
                        iframe.msRequestFullscreen()
                      }
                    }
                  }}
                  className={styles.projectLink}
                >
                  <span className={styles.linkIcon}>⛶</span>
                  Ver em Tela Cheia
                  <span className={styles.linkArrow}>⤢</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SEÇÃO 6: CONTATO (Scroll Normal) */}
      <section ref={contatoRef} className={styles.contactSection}>
        <div className={styles.contactContent}>
          <h2 className={styles.contactTitle}>Vamos Conversar?</h2>
          <p className={styles.contactSubtitle}>
            Interessado em colaborar ou discutir projetos de dados?
          </p>
          
          <div className={styles.contactLinks}>
            <a href="https://linkedin.com/in/seuperfil" className={styles.contactButton}>
              <span className={styles.contactIcon}>💼</span>
              LinkedIn
            </a>
            <a href="mailto:seu@email.com" className={styles.contactButton}>
              <span className={styles.contactIcon}>✉️</span>
              Email
            </a>
            <a href="https://github.com/seuperfil" className={styles.contactButton}>
              <span className={styles.contactIcon}>🐙</span>
              GitHub
            </a>
          </div>

          <form className={styles.contactForm}>
            <input 
              type="text" 
              placeholder="Seu Nome" 
              className={styles.formInput}
              required
            />
            <input 
              type="email" 
              placeholder="Seu Email" 
              className={styles.formInput}
              required
            />
            <textarea 
              placeholder="Sua Mensagem" 
              className={styles.formTextarea}
              rows="5"
              required
            ></textarea>
            <button type="submit" className={styles.formSubmit}>
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>

      {/* Modal de Documentação */}
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
      />

      {/* Modal de Imagem do Perfil */}
      <div 
        className={`${styles.imageModal} ${isImageModalOpen ? styles.open : ''}`}
        onClick={closeImageModal}
        style={{ 
          display: isImageModalOpen ? 'flex' : 'none'
        }}
      >
        <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
          <button 
            className={styles.imageModalClose}
            onClick={closeImageModal}
            aria-label="Fechar"
          >
            ×
          </button>
          <picture>
            <source srcSet={perfilWebP} type="image/webp" />
            <img 
              src={perfilPNG} 
              alt="Igor Santana - Foto Ampliada" 
              className={styles.imageModalImg}
            />
          </picture>
        </div>
      </div>
    </>
  )
}

export default PortfolioDashboard

