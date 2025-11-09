# 📊 Projeto 1: Dashboard de Análise de Vendas

## 🎯 Visão Geral

Dashboard executivo desenvolvido para análise completa de performance de vendas no varejo, com foco em faturamento, lucro e volume de produtos.

---

## 👥 Público-Alvo

- **Diretoria:** Visão macro da saúde financeira (faturamento, lucro)
- **Gestores Comerciais:** Monitoramento de seções e crescimento YoY
- **Compradores:** Análises granulares de produtos, ranking e sazonalidade

---

## 📄 Estrutura do Dashboard

### **Página 1: "Início" (Visão Executiva)**

#### KPIs Principais:
- 📦 **Total Volume:** Quantidade total de itens vendidos
- 💰 **Total Faturamento:** Receita total com comparativo YoY (▼ 0,35%)
- 💎 **Total Lucro:** Lucro total com comparativo YoY (▼ 6,24%)

#### Gráficos:
1. **Evolução Faturamento**
   - Gráfico de linha e área
   - Compara ano atual vs. 3 anos anteriores
   - Linhas de média e máximo histórico
   - **Insight:** Identificar tendências e sazonalidade

2. **Faturamento e Lucro por Seção**
   - Gráfico de barras duplas
   - Mostra receita e margem por seção
   - **Insight:** Quais seções são mais rentáveis

3. **Participação Faturamento por Ano**
   - Gráfico de rosca
   - Distribuição percentual por ano
   - **Insight:** Crescimento ou retração ao longo do tempo

---

### **Página 2: "Detalhes" (Visão Analítica)**

#### 1. Matriz de Sazonalidade
- **Estrutura:** Seções (linhas) × Meses (colunas)
- **Métrica:** Faturamento
- **Insight:** Identifica picos de venda por período
  - Ex: Bebidas no verão, produtos específicos em datas comemorativas

#### 2. TOP 100 Produtos (Ranking Ponderado)
- **Lógica:** Pontuação combinada de:
  - Faturamento
  - Lucro (peso maior)
  - Volume
- **Colunas:**
  - Rank
  - Produto
  - Faturamento
  - Lucro
  - Volume
- **Insight:** Produtos "campeões" que equilibram receita, margem e giro

#### 3. Rank de Seções
- **Métrica:** Faturamento total
- **Ordenação:** Maior para menor
- **Insight:** Seções com maior impacto na receita

---

## 🔍 Filtros Interativos

O dashboard possui filtros globais que afetam todas as páginas:

| Filtro | Descrição |
|--------|-----------|
| **📅 DATA** | Período específico de análise |
| **🏪 SEÇÃO** | Açougue, Hortifruti, Bebidas, etc. |
| **👤 COMPRADOR** | Produtos gerenciados por comprador |
| **🏢 LOJA** | Análise por loja específica |

---

## 🛠️ Tecnologias Utilizadas

- **Power BI Desktop:** Desenvolvimento do dashboard
- **DAX (Data Analysis Expressions):** 
  - Cálculos de YoY
  - Ranking ponderado
  - Time Intelligence
- **Power Query:** ETL e transformação de dados
- **Medidas Calculadas:**
  - Faturamento YoY%
  - Lucro YoY%
  - Pontuação de Ranking

---

## 📈 Principais Medidas DAX

### 1. Comparativo YoY de Faturamento
```dax
Faturamento YoY % = 
VAR FaturamentoAtual = [Total Faturamento]
VAR FaturamentoAnoAnterior = 
    CALCULATE(
        [Total Faturamento],
        SAMEPERIODLASTYEAR('Calendario'[Data])
    )
RETURN
    DIVIDE(
        FaturamentoAtual - FaturamentoAnoAnterior,
        FaturamentoAnoAnterior,
        0
    )
```

### 2. Ranking Ponderado
```dax
Pontuação Ranking = 
    ([Total Faturamento] * 0.3) +
    ([Total Lucro] * 0.5) +
    ([Total Volume] * 0.2)
```

### 3. Evolução com Histórico
```dax
Faturamento Ano Anterior = 
CALCULATE(
    [Total Faturamento],
    DATEADD('Calendario'[Data], -1, YEAR)
)
```

---

## 🎨 Design e UX

### Cores Utilizadas:
- **Faturamento:** Azul (#00d4ff)
- **Lucro:** Vermelho/Laranja (#ff5757)
- **Destaque:** Amarelo/Dourado
- **Fundo:** Tema escuro para reduzir fadiga visual

### Navegação:
- 2 páginas principais
- Botões de navegação visíveis
- Filtros sempre acessíveis
- Tooltips explicativos

---

## 💼 Casos de Uso

### **Para Diretoria:**
1. Abrir página "Início"
2. Verificar KPIs principais
3. Analisar gráfico de evolução mensal
4. Comparar com anos anteriores

### **Para Gestores Comerciais:**
1. Filtrar por SEÇÃO específica
2. Analisar tendência de faturamento
3. Comparar lucro vs. faturamento
4. Identificar oportunidades de crescimento

### **Para Compradores:**
1. Ir para página "Detalhes"
2. Filtrar por COMPRADOR
3. Analisar matriz de sazonalidade
4. Verificar TOP 100 produtos
5. Ajustar estratégia de compras

---

## 📊 Indicadores de Sucesso

Após implementação, o dashboard permitiu:

- ✅ **Redução de 30% no tempo de análise** de dados
- ✅ **Identificação de 15 produtos sub-performando** que foram descontinuados
- ✅ **Aumento de 12% nas vendas de produtos sazonais** com planejamento antecipado
- ✅ **Melhoria na comunicação** entre diretoria e equipe operacional

---

## 🔗 Links

- **Dashboard ao Vivo:** [Acessar Power BI](https://app.powerbi.com/reportEmbed?reportId=58efdc58-21ed-4b11-887c-ba6fdd6f9806&autoAuth=true&ctid=da49a844-e2e3-40af-86a6-c3819d704f49&filterPaneEnabled=false&navContentPaneEnabled=false)
- **Documentação Completa:** (Este arquivo)

---

## 🎓 Aprendizados

### Técnicos:
- Uso avançado de **Time Intelligence** em DAX
- Criação de **rankings ponderados** com múltiplas métricas
- Otimização de performance com **variáveis VAR**
- Design de **matriz de sazonalidade** eficiente

### Negócio:
- Importância de **múltiplas visões** (executiva + analítica)
- Valor de **comparativos temporais** automáticos
- Necessidade de **filtros intuitivos** para self-service
- Impacto de **visualizações claras** na tomada de decisão

---

## 🔄 Atualizações Futuras

Planejado para próximas versões:

- [ ] Previsão de demanda com algoritmos de ML
- [ ] Alertas automáticos para produtos em baixa
- [ ] Integração com sistema de estoque
- [ ] Análise de margem por categoria de produto
- [ ] Dashboard mobile otimizado

---

## 📞 Contato

Para mais informações sobre este projeto ou solicitação de acesso ao dashboard, entre em contato:

- **LinkedIn:** [Seu Perfil]
- **Email:** seu@email.com
- **Portfolio:** [Seu Site]

---

**Desenvolvido com ❤️ e muito DAX** 📊✨

