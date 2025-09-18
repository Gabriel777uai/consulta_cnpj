

document.getElementById('puxarBtn').addEventListener('click' , () => {
    let cnpjInput = document.getElementById('dadosInput');

    console.log('test')
    function formartCnpj(cnpj) {
        let newFormat = cnpj.replace(/[.,-\/]/g,'');
        let formatArray = newFormat.split('');
        let message = document.getElementById('mensagem');

        if (formatArray.length < 14 || formatArray.length > 14) {
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
                    let cnpjFormatado = `${data_json.taxId.slice(0, 2)}.${data_json.taxId.slice(2, 5)}.${data_json.taxId.slice(5, 8)}/${data_json.taxId.slice(8, 12)}-${data_json.taxId.slice(12, 14)}`
                    message.innerHTML = `
                    <div class="card-empresa">
                        <div class="cabecalho">
                            <div class="informacoes-basicas">
                                <h1>${data_json.alias}</h1>
                                <div class="status-data">
                                    <span class="status ativo"><i class="fa-solid fa-circle-check"></i> ${cnpjFormatado}</span>
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
                                <span>${data_json.company.nature.text} (${data_json.company.nature.id})</span>
                            </div>
                            <div class="detalhe-item">
                                <i class="fa-solid fa-map-pin"></i>
                                <span>${data_json.address.street} <i class="fa-solid fa-copy"></i></span>
                            </div>
                            <div class="detalhe-item">
                                <i class="fa-solid fa-envelope"></i>
                                <span>${data_json.emails.address}</span>
                            </div>
                            <div class="detalhe-item">
                                <i class="fa-solid fa-location-arrow"></i>
                                <span>${data_json.address.district}</span>
                            </div>
                            <div class="detalhe-item">
                                <i class="fa-solid fa-building"></i>
                                <span>${data_json.address.city} | ${data_json.address.state} | ${data_json.address.zip} <i class="fa-solid fa-copy"></i></span>
                            </div>
                        </div>

    
                        <div class="abas">
                            <div class="conteudo-aba">
                                <div class="cabeçalho-tabela">
                                    <span><i class="fa-solid fa-clipboard-list"></i> 1</span>
                                    <a href="#"><i class="fa-solid fa-sync-alt"></i></a>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>UF</th>
                                            <th>Inscrições Estaduais</th>
                                            <th>Situação CNPJ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${data_json.registrations[0].state}<i class="fa-solid fa-copy"></i></td>
                                            <td>${data_json.registrations[0].number}</td>
                                            <td>${data_json.registrations[0].status.text}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                }
            }
        return Dados(newFormat);
        }
    }
    formartCnpj(cnpjInput.value)
}) 