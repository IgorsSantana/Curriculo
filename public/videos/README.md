# 🎥 Guia de Vídeos para o Portfolio

## 📦 Estrutura Necessária

Coloque seus vídeos nesta pasta com os seguintes nomes:

```
public/videos/
├── projeto1.mp4
├── projeto1.webm
├── projeto2.mp4
└── projeto2.webm
```

## 🎬 Como Criar os Vídeos dos Dashboards

### Opção 1: Gravar a Tela (Recomendado)

Use o **OBS Studio** (gratuito):

1. Baixe em: https://obsproject.com/
2. Configure:
   - **Scene**: Capture Window (selecione seu navegador com Power BI)
   - **Resolution**: 1920x1080 (Full HD)
   - **FPS**: 30 (suficiente para dashboards)
3. Grave interações com seu dashboard (15-30 segundos)
4. Exporte e converta (veja abaixo)

### Opção 2: Exportar do Power BI

Se estiver no Power BI Service:
- Alguns dashboards permitem exportação de animações
- Exporte como GIF e converta para vídeo

## 🛠️ Como Otimizar os Vídeos

### Usando FFmpeg (Recomendado)

Instale o FFmpeg: https://ffmpeg.org/download.html

```bash
# Converter para MP4 otimizado (H.264)
ffmpeg -i seu_video.mov -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -vf scale=1920:1080 projeto1.mp4

# Converter para WebM otimizado (VP9)
ffmpeg -i seu_video.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1920:1080 projeto1.webm
```

**Parâmetros Explicados:**
- `-crf 23`: Qualidade (18=melhor, 28=menor arquivo)
- `-preset medium`: Velocidade de encoding
- `scale=1920:1080`: Força Full HD

### Usando Online (Sem Instalar Nada)

- **CloudConvert**: https://cloudconvert.com/
- **Online Video Converter**: https://www.onlinevideoconverter.com/

Configurações:
- Formato: MP4 (H.264) e WebM (VP9)
- Resolução: 1920x1080
- Bitrate: 2-5 Mbps

## 📏 Especificações Recomendadas

| Propriedade | Valor Recomendado |
|-------------|------------------|
| **Resolução** | 1920x1080 (Full HD) |
| **FPS** | 30 fps |
| **Duração** | 15-30 segundos |
| **Codec MP4** | H.264 |
| **Codec WebM** | VP9 |
| **Bitrate** | 2-5 Mbps |
| **Tamanho Final** | 5-15 MB por vídeo |

## 🎨 Dicas de Conteúdo para os Vídeos

### Para o Projeto 1:
- Mostre KPIs principais sendo atualizados
- Interações com filtros
- Transições entre páginas do relatório
- Gráficos animados

### Para o Projeto 2:
- Diferentes visualizações
- Drill-downs em ação
- Tooltips interativos
- Animações de dados

## 🚀 Teste Rápido (Sem Vídeos Reais)

Para testar o site sem vídeos ainda, o navegador irá mostrar um espaço preto com a mensagem "Dashboard do Projeto X". O layout e as animações funcionarão normalmente!

Você pode usar **vídeos placeholder** temporários:
- Baixe vídeos gratuitos de: https://pixabay.com/videos/
- Procure por "dashboard", "data", "analytics"
- Ou use qualquer vídeo para testar a estrutura

## ⚠️ Importante

- **Não commite vídeos grandes no Git!** (já configurado no .gitignore)
- Use serviços de hosting para vídeos grandes:
  - AWS S3
  - Cloudflare R2
  - Vercel Blob Storage
- Depois atualize os `src` no componente para as URLs remotas

