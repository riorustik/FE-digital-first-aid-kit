import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicationData } from "../../../redux/slices/medicine";
import { MedicineData } from "../../../components";
import { Grid, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

export const Medicine = () => {
  const dispatch = useDispatch();
  const { title } = useParams();
  const { medicationData } = useSelector((state) => state.medicine);
  const isPostsLoading = medicationData.status === "loading";
  const { data } = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(fetchMedicationData(title));
  }, []);
  return (
    <>
      <Grid container spacing={1} style={{ paddingTop: 30 }}>
        <Link to={`/pharmacy/${data?.userData?.pharmacy}`}>
          <Button variant="outlined">Назад</Button>
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "start",
            width: "100%",
          }}
        >
          {isPostsLoading ? (
            <div>Инструкция недоступна</div>
          ) : (
            <>
              <MedicineData
                title={"Название"}
                text={medicationData.items.fullname}
              />
              <MedicineData
                title={"Лекарственная форма"}
                text={medicationData.items.dosageForm}
              />
              <MedicineData
                title={"Страна производитель"}
                text={medicationData.items.countryOfOrigin}
              />
              <MedicineData
                title={"Форма выпуска"}
                text={medicationData.items.releaseForm}
              />
              <MedicineData
                title={"Активное вещество"}
                text={medicationData.items.activeSubstance}
              />
              <MedicineData
                title={"Фармакотерапевтическая группа"}
                text={medicationData.items.pharmacotherapeuticGroup}
              />
              <MedicineData
                title={"Фармакологическое действие"}
                text={medicationData.items.pharmacologicalAction}
              />
              <MedicineData
                title={"Фармакокинетика"}
                text={medicationData.items.pharmacokinetics}
              />
              <MedicineData
                title={"Показания препарата"}
                text={medicationData.items.indicationsOfTheDrug}
              />
              <MedicineData
                title={"Режим дозирования"}
                text={medicationData.items.dosageRegimen}
              />
              <MedicineData
                title={"Побочное действие"}
                text={medicationData.items.sideAffect}
              />
              <MedicineData
                title={"Противопоказания к применению"}
                text={medicationData.items.contraindicationsToUse}
              />
              <MedicineData
                title={"Применение при беременности и кормлении грудью"}
                text={medicationData.items.useDuringPregnancyAndLactation}
              />
              <MedicineData
                title={"Применение при нарушениях функции печени"}
                text={medicationData.items.useImpairedLiverFunction}
              />
              <MedicineData
                title={"Применение при нарушениях функции почек"}
                text={medicationData.items.useImpairedRenalFunction}
              />
              <MedicineData
                title={"Применение у детей"}
                text={medicationData.items.useInChildren}
              />
              <MedicineData
                title={"Применение у пожилых пациентов"}
                text={medicationData.items.useInElderlyPatients}
              />
              <MedicineData
                title={"Особые указания"}
                text={medicationData.items.specialInstructions}
              />
              <MedicineData
                title={"Передозировка"}
                text={medicationData.items.overdose}
              />
              <MedicineData
                title={"Лекарственное взаимодействие"}
                text={medicationData.items.drugInteraction}
              />
              <MedicineData
                title={"Условия хранения препарата"}
                text={medicationData.items.storageConditions}
              />
              <MedicineData
                title={"Срок годности препарата"}
                text={medicationData.items.shelfLife}
              />
              <MedicineData
                title={"Условия реализации"}
                text={medicationData.items.termsOfImplementation}
              />
            </>
          )}
        </div>
      </Grid>
    </>
  );
};
