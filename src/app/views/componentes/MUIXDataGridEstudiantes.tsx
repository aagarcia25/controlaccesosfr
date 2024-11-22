import { ThemeProvider, createTheme } from "@mui/material";
import { esES as coreEsES } from "@mui/material/locale";
import {
  DataGrid,
  GridColumnVisibilityModel,
  GridToolbar,
  esES as gridEsES,
} from "@mui/x-data-grid";
import * as React from "react";

const theme = createTheme(coreEsES, gridEsES);

export default function MUIXDataGridEstudiantes(props: any) {
  const [selectionModel, setSelectionModel] = React.useState<any[]>([]);
  const handleSelectionModelChange = (newSelectionModel: any) => {
    setSelectionModel(newSelectionModel);
    props.setRowSelected(newSelectionModel);
  };

  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      id: false,
      IdConCheque: false,
      TipoSolicitud: false,
      deleted: false,
      IdMun: false,
    });

  return (
    <ThemeProvider theme={theme}>
      <DataGrid
        {...props.rows}
        density="compact"
        disableSelectionOnClick
        disableIgnoreModificationsIfProcessingProps
        disableDensitySelector
        rowsPerPageOptions={[12]}
        getRowHeight={() => "auto"}
        components={{ Toolbar: GridToolbar }}
        pageSize={20}
        columns={props.columns}
        rows={props.rows}
        checkboxSelection
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={handleSelectionModelChange}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        sx={{
          fontFamily: "sans-serif",
          fontSize: "12px", // Puedes ajustar el tamaño según tus preferencias
          "& .super-app-theme--cell": {
            backgroundColor: "rgba(224, 183, 60, 0.55)",
            color: "#1a3e72",
            fontWeight: "500",
          },
          "& .super-app.negative": {
            color: "rgb(84, 3, 3)",
            backgroundColor: "rgb(196, 40, 40, 0.384)",
          },
          "& .super-app.positive": {
            color: "#000000",
          },
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
            csvOptions: {
              fileName: new Date().getMilliseconds() + "_Export",
              utf8WithBom: true,
            },
          },
        }}
        localeText={{
          columnsPanelHideAllButton: "Ocultar todo",
          columnsPanelShowAllButton: "Mostrar todo",
          columnsPanelTextFieldPlaceholder: "",
          columnsPanelTextFieldLabel: "Buscar",
          noRowsLabel: "No se ha encontrado datos.",
          noResultsOverlayLabel: "No se ha encontrado ningún resultado",
          toolbarColumns: "Columnas",
          toolbarExport: "Exportar",
          toolbarColumnsLabel: "Seleccionar columnas",
          toolbarFilters: "Filtros",
          toolbarFiltersLabel: "Ver filtros",
          toolbarFiltersTooltipHide: "Quitar filtros",
          toolbarFiltersTooltipShow: "Ver filtros",
          toolbarQuickFilterPlaceholder: "Buscar",
          toolbarExportCSV: "Descargar como CSV",
          toolbarExportPrint: "Imprimir",
          checkboxSelectionSelectRow: "Filas seleccionadas",
          checkboxSelectionSelectAllRows: "Seleccionar todas las filas",
          errorOverlayDefaultLabel: "Ha ocurrido un error.",
          footerRowSelected: (count) =>
            count > 1
              ? `${count.toLocaleString()} filas seleccionadas`
              : `${count.toLocaleString()} fila seleccionada`,
          footerTotalRows: "Filas Totales:",
          columnMenuLabel: "Menú",
          columnMenuShowColumns: "Mostrar columnas",
          columnMenuFilter: "Filtro",
          columnMenuHideColumn: "Ocultar",
          columnMenuUnsort: "Desordenar",
          columnMenuSortAsc: "Ordenar ASC",
          columnMenuSortDesc: "Ordenar DESC",
          columnHeaderFiltersTooltipActive: (count) =>
            count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
          columnHeaderFiltersLabel: "Mostrar filtros",
          columnHeaderSortIconLabel: "Ordenar",
          filterPanelColumns: "Columnas",
          filterOperatorContains: "Contiene",
          filterOperatorEquals: "Igual",
          filterOperatorStartsWith: "Comienza Con",
          filterOperatorEndsWith: "Termina Con",
          filterOperatorIsEmpty: "Es Vacio",
          filterOperatorIsNotEmpty: "No Vacio",
          filterOperatorIsAnyOf: "Es Cualquiera de",
          filterPanelInputLabel: "Valor",
          filterPanelInputPlaceholder: "Valor Filtrado",
        }}
      />
    </ThemeProvider>
  );
}
