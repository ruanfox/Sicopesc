import React, { useEffect, useState, useMemo } from "react";
import api from "../../../services/api";

import {
  Container,
  ReportStatusContainer,
  ReportStatus,
  LoadingContainer,
  FilterWrapper,
} from "./styles";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import {
  FaAngleLeft,
  FaAngleRight,
  FaBackward,
  FaEye,
  FaForward,
} from "react-icons/fa";
import queryString from "query-string";
import Select from "react-select";
import { ScaleLoader } from "react-spinners";

function RelatorioAnuidade(props) {
  const [filterType, setFilterType] = useState("anual");
  const [report, setReport] = useState({});
  const [period, setPeriod] = useState({
    dataInicio: new Date(),
    dataFim: new Date(),
  });
  const [pagination, setPagination] = useState({
    itemCount: 0,
    pageCount: 0,
    pages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    []
  );
  useEffect(() => {
    function getRelatorio() {
      setLoading(true);
      let dataInicio = new Date(),
        dataFim = new Date();

      if (selectedYear !== dataFim.getFullYear()) {
        dataFim = new Date(selectedYear + "-12-31");
      }

      switch (filterType) {
        case "anual":
          dataInicio = new Date(selectedYear + "-01-02");
          break;

        case "mensal":
          const trintaDiasMs = 30 * 24 * 60 * 60 * 1000;
          dataInicio.setTime(dataFim.getTime() - trintaDiasMs);
          break;

        case "semanal":
          const seteDiasMs = 7 * 24 * 60 * 60 * 1000;
          dataInicio.setTime(dataFim.getTime() - seteDiasMs);
          break;

        case "diario":
          const umDiaMs = 1 * 24 * 60 * 60 * 1000;
          dataInicio.setTime(dataFim.getTime() - umDiaMs);
          break;

        default:
          break;
      }

      api
        .get(
          `/guias/pescador/relatorio?data_inicio=${dataInicio}&data_fim=${dataFim}&page=${page}`
        )
        .then((response) => {
          const report = response.data;
          setReport(report);
          setPeriod({
            dataInicio,
            dataFim,
          });

          setPagination({
            itemCount: report.itemCount,
            pageCount: report.pageCount,
            pages: report.pages,
            currentPage: report.currentPage,
          });
        })
        .finally(() => setLoading(false));
    }
    getRelatorio();
  }, [filterType, page, selectedYear]);

  useEffect(() => {
    const values = queryString.parse(props.location.search);
    setPage(values.page);
  }, [props]);

  const options = [
    { value: "anual", label: "Anual" },
    { value: "mensal", label: "Mensal" },
    { value: "semanal", label: "Semanal" },
    { value: "diario", label: "Diário" },
  ];

  const [yearOptions, setYearOptions] = useState([
    { value: 2020, label: "2020" },
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
  ]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    let options = [];
    for (let i = currentYear - 10; i <= currentYear; i++) {
      options.push({ value: i, label: i });
    }
    setYearOptions(options);
  }, []);

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      marginBottom: 10,
      width: 200,
      marginRight: 10,
    }),
    control: (provided, state) => ({
      ...provided,
      background: `linear-gradient(#007DF5, #0892C9)`,
      borderRadius: 10,
      color: "#fff",
      border: "none",
    }),

    singleValue: (provided, state) => ({
      ...provided,
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    }),

    placeholder: (provided, state) => ({
      ...provided,
      color: "#fff",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#fff",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    menuList: (provided, state) => ({
      ...provided,
      borderRadius: 10,
      color: "#007DF5",
      fontSize: 16,
      fontWeight: "bold",
    }),
    menu: (provided, state) => ({
      ...provided,
      //background: `linear-gradient(#007DF5, #0892C9)`,
      borderRadius: 10,
    }),
  };

  return (
    <Container className="container">
      <FilterWrapper>
        <Select
          options={options}
          styles={customStyles}
          defaultValue={
            options[options.findIndex((option) => option.value === filterType)]
          }
          onChange={(option) => {
            setFilterType(option.value);
          }}
        />

        {filterType === "anual" && (
          <Select
            options={yearOptions}
            styles={customStyles}
            placeholder="Ano"
            defaultValue={
              yearOptions[
                yearOptions.findIndex((option) => option.value === selectedYear)
              ]
            }
            onChange={(option) => {
              setSelectedYear(option.value);
            }}
          />
        )}
      </FilterWrapper>

      {loading && (
        <LoadingContainer>
          <span>Carregando...</span> <ScaleLoader color={"#0892c9"} />
        </LoadingContainer>
      )}
      {!loading && (
        <>
          <ReportStatusContainer className="gradient-primary">
            <ReportStatus>
              <label>Total de Pagamentos:</label>
              <span>{report.itemCount}</span>
            </ReportStatus>
            <ReportStatus>
              <label>Total Recolhido:</label>
              <span>{formatter.format(report.totalRecolhido)}</span>
            </ReportStatus>
            <ReportStatus>
              <label>Período:</label>
              <span>
                De {period.dataInicio.toLocaleDateString()} à{" "}
                {period.dataFim.toLocaleDateString()}
              </span>
            </ReportStatus>
          </ReportStatusContainer>

          <table className="table table-responsive" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>RGP</th>
                <th>Nome</th>
                <th>Valor Pago</th>
                <th>Data do pagamento</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {report?.guias?.map((guia) => (
                <tr key={guia.id}>
                  <td>{guia.pescador.rgp}</td>
                  <td>{guia.pescador.nome}</td>
                  <td>{formatter.format(guia.valor)}</td>
                  <td>{new Date(guia.data_emissao).toLocaleDateString()}</td>
                  <td style={{ display: "flex" }}>
                    <Link
                      className="btn btn-primary"
                      to={"/ver-guia/" + guia.pescador.id}
                      style={{ width: 120, height: 50 }}
                    >
                      <FaEye style={{ marginRight: 5 }} /> Ver Guia
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px"
            }}
          >
            <Pagination
              activePage={parseInt(pagination.currentPage)}
              pageCount={parseInt(pagination.pageCount)}
              totalItemsCount={parseInt(pagination.itemCount)}
              onChange={(page) => {
                props.history.push(`/relatorios/anuidade?page=${page}`);
              }}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              activeClass="active"
              nextPageText={<FaAngleRight />}
              prevPageText={<FaAngleLeft />}
              lastPageText={<FaForward />}
              firstPageText={<FaBackward />}
            />
          </div>
        </>
      )}
    </Container>
  );
}

export default RelatorioAnuidade;
