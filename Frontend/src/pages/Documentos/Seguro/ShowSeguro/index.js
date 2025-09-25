import React from "react";
import { Container } from "./styles";
<<<<<<< HEAD
import brasao from "./assets/image.jpg";
=======
import brasao from "./assets/image.jpg"
>>>>>>> feature/alteracoes

export default function ShowSeguro() {
  return (
    <Container>
<<<<<<< HEAD
        <div className="logo">
            <img src={brasao} alt="Brasão" className="brasao" />
            <h3>INSTITUTO NACIONAL DO SEGURO SOCIAL</h3>
            <h4>ANEXO II</h4>
            <h4>OFÍCIO-CIRCULAR Nº 46 DIRBEN/INSS, DE 13 DE SETEMBRO DE 2019.</h4>
            <h4>AUTODECLARAÇÃO DO SEGURADO ESPECIAL – PESCADOR</h4>
            <p>TODAS AS INFORMAÇÕES SERÃO CHECADAS NOS SISTEMAS OFICIAIS</p>
        </div>
        <table>
            <tbody>
            <tr>
                <th className="section" colSpan="4">1. Dados do Segurado</th>
            </tr>
            <tr>
                <th>Nome</th><td className="wide"></td>
                <th>Apelido</th><td></td>
            </tr>
            <tr>
                <th>Data de Nascimento (DN)</th><td></td>
                <th>Local de Nascimento</th><td></td>
            </tr>
            <tr>
                <th>Endereço Residencial</th><td colSpan="3"></td>
            </tr>
            <tr>
                <th>Município</th><td></td>
                <th>UF</th><td></td>
            </tr>
            <tr>
                <th>CPF</th><td></td>
                <th>RG</th><td></td>
            </tr>
            <tr>
                <th>Data/Local de Expedição (RG)</th><td></td>
                <th>*RGP / Matrícula CEI/CAEPF</th><td></td>
            </tr>

            <tr>
                <th className="section" colSpan="4">2. Período(s) de atividade pesca</th>
            </tr>
            <tr>
                <th>Período (dd/mm/aaaa a dd/mm/aaaa)</th>
                <th>Local onde exerce a atividade*</th>
                <th>Situação</th>
                <th>Observações</th>
            </tr>
            {/* repetir linhas conforme necessário */}
            <tr>
                <td></td>
                <td>*Mar / Rio / Estuário / Lagoa / Açude / Represa</td>
                <td>
                <input type="checkbox" /> Individualmente<br />
                <input type="checkbox" /> Regime de economia familiar
                </td>
                <td></td>
            </tr>
            <tr><td></td><td></td><td></td><td></td></tr>

            <tr>
                <th className="section" colSpan="4">2.1. Condição no grupo (economia familiar)</th>
            </tr>
            <tr>
                <th>Condição</th>
                <td colSpan="3">
                <input type="radio" name="condicao" /> Titular
                <input type="radio" name="condicao" /> Componente
                </td>
            </tr>

            <tr>
                <th className="section" colSpan="4">2.2. Grupo Familiar (quando aplicável)</th>
            </tr>
            <tr>
                <th>Nome</th><th>Data Nasc (DN)</th><th>CPF</th><th>Estado Civil / Parentesco</th>
            </tr>
            <tr><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td><td></td></tr>

            <tr>
                <th className="section" colSpan="4">3. Condição em relação à embarcação</th>
            </tr>
            <tr>
                <th>Período (dd/mm/aaaa a dd/mm/aaaa)</th>
                <th>Condição em relação à embarcação*</th>
                <th>Arqueação bruta (AB)</th>
                <th>Observações</th>
            </tr>
            <tr>
                <td></td>
                <td>*Arrendatário / Comodatário / Meeiro / Parceiro / Proprietário / Pescador artesanal ou mariscador sem embarcação</td>
                <td></td><td></td>
            </tr>

            <tr>
                <th className="section" colSpan="4">3.1. Arrendamento (se proprietário)</th>
            </tr>
            <tr><th>Período</th><td colSpan="3"></td></tr>

            <tr>
                <th className="section" colSpan="4">3.2. Nome e CPF do(s) titular(es) da embarcação</th>
            </tr>
            <tr><th>Nome</th><th>CPF</th><th>Período</th><th>Observações</th></tr>
            <tr><td></td><td></td><td></td><td></td></tr>

            <tr>
                <th className="section" colSpan="4">3.3. Atividade pesqueira</th>
            </tr>
            <tr>
                <th>Atividade</th><td></td>
                <th>Subsistência / Venda</th>
                <td>
                <input type="checkbox" /> Subsistência
                <input type="checkbox" /> Venda
                </td>
            </tr>

            <tr>
                <th className="section" colSpan="4">3.4. Recolhimento de IPI sobre venda da produção</th>
            </tr>
            <tr>
                <th>Houve recolhimento de IPI?</th>
                <td colSpan="3">
                <input type="radio" name="ipi" /> SIM
                <input type="radio" name="ipi" /> NÃO
                <br />Período: (dd/mm/aaaa a dd/mm/aaaa)
                </td>
            </tr>

            <tr>
                <th className="section" colSpan="4">3.5. Possui empregado(s) ou prestador(es) de serviço</th>
            </tr>
            <tr>
                <th>Possui?</th>
                <td colSpan="3">
                <input type="radio" name="emp" /> SIM
                <input type="radio" name="emp" /> NÃO
                <br />Se sim: Nome / CPF / Período
                <div className="notes">
                    Observação: esta declaração deverá ser assinada pelo declarante em todas as suas páginas.
                </div>
                </td>
            </tr>

            <tr>
                <th className="section" colSpan="4">4. Outras atividades / rendas</th>
            </tr>
            <tr>
                <th>Atividade</th><th>Local</th><th>Período</th><th>Renda (R$) / Outras informações</th>
            </tr>
            <tr><td></td><td></td><td></td><td></td></tr>

            <tr>
                <th className="section" colSpan="4">4.1. Recebeu outra renda (ex.: atividade turística, mandato etc.)</th>
            </tr>
            <tr>
                <th>Recebeu?</th>
                <td colSpan="3">
                <input type="radio" name="outra_renda" /> SIM
                <input type="radio" name="outra_renda" /> NÃO
                <br />Atividade / Período / Renda / Observações
                </td>
            </tr>

            <tr>
                <th className="section" colSpan="4">4.2. Participa de cooperativa</th>
            </tr>
            <tr>
                <th>Participa?</th>
                <td colSpan="3">
                <input type="radio" name="coop" /> SIM
                <input type="radio" name="coop" /> NÃO
                <br />Entidade / CNPJ / Informar se é agropecuária ou de crédito rural
                </td>
            </tr>

            <tr>
                <th className="section" colSpan="4">Declaração</th>
            </tr>
            <tr>
                <td colSpan="4" className="notes">
                Declaro sob as penas previstas na legislação, que as informações prestadas nesta declaração são verdadeiras,
                estando ciente das penalidades do Art. 299 do Código Penal Brasileiro.
                </td>
            </tr>

            <tr>
                <th>Local</th><td></td>
                <th>Data</th><td></td>
            </tr>
            <tr>
                <th>Assinatura do segurado/requerente</th>
                <td colSpan="3"></td>
            </tr>

            <tr>
                <td colSpan="4" className="notes">
                <strong>Obs:</strong> Formato baseado no arquivo fornecido. Campos em branco podem ser repetidos/expandido conforme necessidade.
                </td>
            </tr>
            </tbody>
        </table>
    </Container>
  );
}
=======
      <table>
        <div className="logo">
            <img src={brasao} alt="Brasão do Brasil" className="brasao" />
            <h3>INSTITUTO NACIONAL DO SEGURO SOCIAL</h3>
            <p>ANEXO II</p>
            <p>OFÍCIO-CIRCULAR Nº 46 DIRBEN/INSS, DE 13 DE SETEMBRO DE 2019.</p>
            <h4>AUTODECLARAÇÃO DO SEGURADO ESPECIAL – PESCADOR</h4>
            <p className="sub">TODAS AS INFORMAÇÕES SERÃO CHECADAS NOS SISTEMAS OFICIAIS</p>
        </div>
        <tbody>
          <tr>
            <th className="section" colSpan="4">1. Dados do Segurado</th>
          </tr>
          <tr>
            <th>Nome</th><td className="wide"></td>
            <th>Apelido</th><td></td>
          </tr>
          <tr>
            <th>Data de Nascimento (DN)</th><td></td>
            <th>Local de Nascimento</th><td></td>
          </tr>
          <tr>
            <th>Endereço Residencial</th><td colSpan="3"></td>
          </tr>
          <tr>
            <th>Município</th><td></td>
            <th>UF</th><td></td>
          </tr>
          <tr>
            <th>CPF</th><td></td>
            <th>RG</th><td></td>
          </tr>
          <tr>
            <th>Data/Local de Expedição (RG)</th><td></td>
            <th>*RGP / Matrícula CEI/CAEPF</th><td></td>
          </tr>

          <tr>
            <th className="section" colSpan="4">2. Período(s) de atividade pesca</th>
          </tr>
          <tr>
            <th>Período (dd/mm/aaaa a dd/mm/aaaa)</th>
            <th>Local onde exerce a atividade*</th>
            <th>Situação</th>
            <th>Observações</th>
          </tr>
          {/* repetir linhas conforme necessário */}
          <tr>
            <td></td>
            <td>*Mar / Rio / Estuário / Lagoa / Açude / Represa</td>
            <td>
              <input type="checkbox" /> Individualmente<br />
              <input type="checkbox" /> Regime de economia familiar
            </td>
            <td></td>
          </tr>
          <tr><td></td><td></td><td></td><td></td></tr>

          <tr>
            <th className="section" colSpan="4">2.1. Condição no grupo (economia familiar)</th>
          </tr>
          <tr>
            <th>Condição</th>
            <td colSpan="3">
              <input type="radio" name="condicao" /> Titular
              <input type="radio" name="condicao" /> Componente
            </td>
          </tr>

          <tr>
            <th className="section" colSpan="4">2.2. Grupo Familiar (quando aplicável)</th>
          </tr>
          <tr>
            <th>Nome</th><th>Data Nasc (DN)</th><th>CPF</th><th>Estado Civil / Parentesco</th>
          </tr>
          <tr><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td></tr>
          <tr><td></td><td></td><td></td><td></td></tr>

          <tr>
            <th className="section" colSpan="4">3. Condição em relação à embarcação</th>
          </tr>
          <tr>
            <th>Período (dd/mm/aaaa a dd/mm/aaaa)</th>
            <th>Condição em relação à embarcação*</th>
            <th>Arqueação bruta (AB)</th>
            <th>Observações</th>
          </tr>
          <tr>
            <td></td>
            <td>*Arrendatário / Comodatário / Meeiro / Parceiro / Proprietário / Pescador artesanal ou mariscador sem embarcação</td>
            <td></td><td></td>
          </tr>

          <tr>
            <th className="section" colSpan="4">3.1. Arrendamento (se proprietário)</th>
          </tr>
          <tr><th>Período</th><td colSpan="3"></td></tr>

          <tr>
            <th className="section" colSpan="4">3.2. Nome e CPF do(s) titular(es) da embarcação</th>
          </tr>
          <tr><th>Nome</th><th>CPF</th><th>Período</th><th>Observações</th></tr>
          <tr><td></td><td></td><td></td><td></td></tr>

          <tr>
            <th className="section" colSpan="4">3.3. Atividade pesqueira</th>
          </tr>
          <tr>
            <th>Atividade</th><td></td>
            <th>Subsistência / Venda</th>
            <td>
              <input type="checkbox" /> Subsistência
              <input type="checkbox" /> Venda
            </td>
          </tr>

          <tr>
            <th className="section" colSpan="4">3.4. Recolhimento de IPI sobre venda da produção</th>
          </tr>
          <tr>
            <th>Houve recolhimento de IPI?</th>
            <td colSpan="3">
              <input type="radio" name="ipi" /> SIM
              <input type="radio" name="ipi" /> NÃO
              <br />Período: (dd/mm/aaaa a dd/mm/aaaa)
            </td>
          </tr>

          <tr>
            <th className="section" colSpan="4">3.5. Possui empregado(s) ou prestador(es) de serviço</th>
          </tr>
          <tr>
            <th>Possui?</th>
            <td colSpan="3">
              <input type="radio" name="emp" /> SIM
              <input type="radio" name="emp" /> NÃO
              <br />Se sim: Nome / CPF / Período
              <div className="notes">
                Observação: esta declaração deverá ser assinada pelo declarante em todas as suas páginas.
              </div>
            </td>
          </tr>

          <tr>
            <th className="section" colSpan="4">4. Outras atividades / rendas</th>
          </tr>
          <tr>
            <th>Atividade</th><th>Local</th><th>Período</th><th>Renda (R$) / Outras informações</th>
          </tr>
          <tr><td></td><td></td><td></td><td></td></tr>

          <tr>
            <th className="section" colSpan="4">4.1. Recebeu outra renda (ex.: atividade turística, mandato etc.)</th>
          </tr>
          <tr>
            <th>Recebeu?</th>
            <td colSpan="3">
              <input type="radio" name="outra_renda" /> SIM
              <input type="radio" name="outra_renda" /> NÃO
              <br />Atividade / Período / Renda / Observações
            </td>
          </tr>

          <tr>
            <th className="section" colSpan="4">4.2. Participa de cooperativa</th>
          </tr>
          <tr>
            <th>Participa?</th>
            <td colSpan="3">
              <input type="radio" name="coop" /> SIM
              <input type="radio" name="coop" /> NÃO
              <br />Entidade / CNPJ / Informar se é agropecuária ou de crédito rural
            </td>
          </tr>

          <tr>
            <th className="section" colSpan="4">Declaração</th>
          </tr>
          <tr>
            <td colSpan="4" className="notes">
              Declaro sob as penas previstas na legislação, que as informações prestadas nesta declaração são verdadeiras,
              estando ciente das penalidades do Art. 299 do Código Penal Brasileiro.
            </td>
          </tr>

          <tr>
            <th>Local</th><td></td>
            <th>Data</th><td></td>
          </tr>
          <tr>
            <th>Assinatura do segurado/requerente</th>
            <td colSpan="3"></td>
          </tr>

          <tr>
            <td colSpan="4" className="notes">
              <strong>Obs:</strong> Formato baseado no arquivo fornecido. Campos em branco podem ser repetidos/expandido conforme necessidade.
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
>>>>>>> feature/alteracoes
