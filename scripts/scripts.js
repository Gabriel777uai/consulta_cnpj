function getCnpj(param) {
    console.log('test')
    function formartCnpj(cnpj) {
        let newFormat = cnpj.replace(/[.,-\/]/g,'');
        let formatArray = newFormat.split('');
        let message = document.getElementById('mensagem');

        if (formatArray.length < 14 || formatArray.length > 14) {
            document.getElementById('puxarBtn').innerHTML = `Puxar Dados`;
            message.innerHTML = "<h4 style='color:red;'>A quantidade de caracteres não é valida, Favor verificque o CNPJ: " + formatArray.length + " numeros digitados, esperados: 14</h4>";
        } else {

            for (x in formatArray) {
                if (/\D/.test(formatArray[x])) {
                    return "Não pode haver letras dentro do cnpj";
                    break;
                }
            }
    
            const Dados = async function getDataCnpj(getCnpj) {
            const response = await fetch(`https://open.cnpja.com/office/${getCnpj}`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer fa99f225-1e7e-4f05-8102-9c588caada6e-70124641-2237-4fda-84da-e074b25fe28d"
                }
            })
                
            const data_json = await response.json();               
        
            if (cnpjInput.length < 1) {
                message.innerHTML = "<h2>Cnpj não encontrado!</h2>" 
            } else {
                document.getElementById('puxarBtn').innerHTML = `Puxar Dados`;
                let cnpjFormatado = `${data_json.taxId.slice(0, 2)}.${data_json.taxId.slice(2, 5)}.${data_json.taxId.slice(5, 8)}/${data_json.taxId.slice(8, 12)}-${data_json.taxId.slice(12, 14)}`
                let dataFounded = `${data_json.founded.slice(8, 10)}/${data_json.founded.slice(5, 7)}/${data_json.founded.slice(0, 4)}`;
                let simplesOptant = (data_json.company.simples.optant) ? `Simples Nacional - Desde ${data_json.company.simples.since.slice(8, 10)}/${data_json.company.simples.since.slice(5, 7)}/${data_json.company.simples.since.slice(0, 4)}` : 'Não é simples';

                let html = `
                <div class="card-empresa">
                    <div class="cabecalho">
                        <div class="informacoes-basicas">
                            <h1>${data_json.company.name}</h1>
                            <div class="status-data">
                                <span class="status ativo"><i class="fa-solid fa-circle-check"></i> ${data_json.status.text}</span>
                                <span class="data-inicio"><i class="fa-solid fa-calendar-alt"></i> ${dataFounded} – Presente</span>
                            </div>
                        </div>
                        <div class="icones-acao">
                            <a href="#"><i class="fa-solid fa-sync-alt"></i></a>
                            <a href="#"><i class="fa-solid fa-share-alt"></i></a>
                            <a href="#"><i class="fa-solid fa-map-marker-alt"></i></a>
                        </div>
                    </div>
                
                    <div class="detalhes">
                        <div class="detalhe-item">
                            <i class="fa-solid fa-briefcase"></i>
                            <span>${data_json.alias}</span>
                        </div>
                        <div class="detalhe-item">
                            <i class="fa-solid fa-map-pin"></i>
                            <span>${data_json.address.street}, ${data_json.address.number} <i class="fa-solid fa-copy"></i></span>
                        </div>
                        <div class="detalhe-item">
                            <i class="fa-solid fa-envelope"></i>
                            <span>${data_json.emails[0]?.address || 'E-mail não disponível'}</span>
                        </div>
                        <div class="detalhe-item">
                            <i class="fa-solid fa-location-arrow"></i>
                            <span>${data_json.address.district}</span>
                        </div>
                        <div class="detalhe-item">
                            <i class="fa-solid fa-phone"></i>
                            <span>(${data_json.phones[0]?.area}) ${data_json.phones[0]?.number} <i class="fa-solid fa-copy"></i></span>
                        </div>
                        <div class="detalhe-item">
                            <i class="fa-solid fa-building"></i>
                            <span>${data_json.address.city} | ${data_json.address.state} | ${data_json.address.zip} <i class="fa-solid fa-copy"></i></span>
                        </div>
                        <div class="detalhe-item">
                            <i class="fa-solid fa-chart-line"></i>
                            <span>Super Simples: <b>${simplesOptant}</b></span>
                        </div>
                    </div>

                    <div class="atualizacao">
                    <p><i class="fa-solid fa-circle-info"></i> Atualizado em ${new Date(data_json.updated).toLocaleDateString('pt-BR')} via Receita Federal</p>
                    </div>
                
                    <div class="abas">
                        <div class="conteudo-aba">
                            <div class="cabeçalho-tabela">
                                <span><i class="fa-solid fa-clipboard-list"></i> ${data_json.sideActivities.length + 1}</span>
                                <a href="#"><i class="fa-solid fa-sync-alt"></i></a>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>CNAE</th>
                                        <th>Tipo</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${data_json.mainActivity.id} <i class="fa-solid fa-copy"></i></td>
                                        <td>Principal</td>
                                        <td>${data_json.mainActivity.text}</td>
                                    </tr>
                                    ${data_json.sideActivities.map(activity => `
                                    <tr>
                                        <td>${activity.id}</td>
                                        <td>Secundária</td>
                                        <td>${activity.text}</td>
                                    </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                
                    <div class="tabela-inscricoes-estaduais">
                    <div class="cabeçalho-tabela">
                        <span><i class="fa-solid fa-clipboard-list"></i> ${data_json.registrations.length}</span>
                        <a href="#"><i class="fa-solid fa-sync-alt"></i></a>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>UF</th>
                                <th>Inscrição Estadual</th>
                                <th>Situação IE</th>
                                <th>Situação CNPJ</th>
                            </tr>
                        </thead>
                        <tbody>
                                ${data_json.registrations.map(reg => `
                            <tr>
                                <td>${reg.state}</td>
                                <td>${reg.number} <i class="fa-solid fa-copy"></i></td>
                                <td>${reg.enabled ? 'Habilitada' : 'Não Habilitada'}</td>
                                <td>${data_json.status.text}</td>
                            </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>`;
            message.innerHTML = html;
            }
        }
    return Dados(newFormat);
    }
    }
formartCnpj(param)
}

let cnpjInput = document.getElementById('dadosInput');

document.getElementById('puxarBtn').addEventListener('click' , function () {
    document.getElementById('puxarBtn').innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`
    getCnpj(cnpjInput.value);
}) 
cnpjInput.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.key == 'Enter') {
        document.getElementById('puxarBtn').innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>`
        getCnpj(cnpjInput.value);
    }
})