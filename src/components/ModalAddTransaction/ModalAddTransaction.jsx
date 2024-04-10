import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datetime from "react-datetime";

import ModalSelect from "../ModalSelect/ModalSelect";
import {Modal} from "components/Modal/Modal";

import { toggleModalAddTransaction } from "redux/modal/modalSlice";
import financeSelectors from "redux/finances/financial-selectors";
import { addTransaction } from 'redux/finances/finances-operations';

import { Formik, Form, Field, ErrorMessage } from "formik";
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import moment from "moment";
import * as Yup from 'yup'; 
import { toast } from "react-toastify";

import "react-datetime/css/react-datetime.css";
import styled from "./ModalAddTransaction.module.scss";

const validationSchema = Yup.object().shape({
  type: Yup.string()
     .required('Type Qis required'),
  amount: Yup.string('Enter your money')
     .min(0)
     .max(10, 'Very large amount, no more than 10 characters')
     .matches(
       /^(?:\d*\.)?\d+$/,'Only positive amount')
     .required('Enter the amount, only numbers and comas'),
  comment: Yup.string()
     .max(30, 'No more than 30 characters')
  .matches(/^[a-zA-Z\s]+$/, 'Only letters are allowed'),
  categoryId: Yup.string('Choose a category')
     .required('Category is required'),
  transactionDate: Yup.date()
  .required('Date is required'),
});


const handleAmount = (value) => {
  if (!value || Number.isNaN(Number(value))) return value;
  const length = value.length;
  const dot = value.indexOf(".");
  if (dot < 0) {
    return value.concat(".00");
  }
  if (dot < length - 3) {
    return value.slice(0, dot + 3);
  }

  if (dot > length - 3) {
    return value.padEnd(dot + 3, "0");
  }
  return value;
};
const valid = function (current) {
  const tommorow = moment().subtract(0, "day");
  return current.isBefore(tommorow);
};
const ModalAddTransaction = () => {
  const dispatch = useDispatch();

  const categories = useSelector(financeSelectors.getCategories);

  const [chooseType, setChooseType] = useState(false);
  const [type, setType] = useState("EXPENSE");

  const startDate = new Date();
  const toastId = useRef("enterAmount");

  const expenseCategories = categories?.filter(
    (category) => category.type === "EXPENSE"
  );

  const incomeCategory = categories?.find(
    (category) => category.type === "INCOME"
  );

  const isCloseModal = () => {
    dispatch(toggleModalAddTransaction());
  };

  const handleChangeType = () => {
    setChooseType(!chooseType);
    setType(chooseType ? "EXPENSE" : "INCOME");
  };

  const enterByFocus = (e) => {
    if (e.keyCode === 13) {
      handleChangeType();
    }
  };

  const handleSubmitForm = ({
    type,
    amount,
    comment,
    categoryId,
    transactionDate,
  }) => {
    const normalizedAmount = type === "EXPENSE" ? -amount : amount;

    if (amount === "0") {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Enter amount!");
      }
      return;
    }

    dispatch(
      addTransaction({
        type,
        amount: normalizedAmount,
        comment,
        categoryId,
        transactionDate,
      })
    );
    isCloseModal();
  };

  return (
    <Modal closeModal={isCloseModal}>
      <div className={styled.transaction}>
        <button onClick={isCloseModal} className={styled.buttonClose}>
          <IconContext.Provider
            value={{ className: "global-class-name", size: "16px" }}
          >
            <GrClose />
          </IconContext.Provider>
        </button>
        <Formik
          initialValues={{
            type: type,
            amount: "",
            comment: "",
            categoryId: "",
            transactionDate: startDate,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmitForm}
          enableReinitialize
          validateOnBlur
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form className={styled.form}>
              <h1 className={styled.form__title}>Add transaction</h1>
              <div className={styled.checkbox}>
                <span
                  className={`${styled.checkboxIncome} ${
                    chooseType && styled.checkboxChecked
                  }`}
                >
                  Income
                </span>
                <label htmlFor="type" className={styled.checkboxLabel}>
                  <input
                    type="checkbox"
                    value="type"
                    checked={chooseType}
                    readOnly
                  />
                  <span
                    onKeyDown={enterByFocus}
                    tabIndex="0"
                    onClick={handleChangeType}
                    className={styled.checkboxSwitch}
                  ></span>
                </label>
                <span
                  className={`${styled.checkboxExpense} ${
                    !chooseType && styled.checkboxChecked
                  }`}
                >
                  Expense
                </span>
              </div>
              {chooseType ? (
                <>
                  <input
                    autoComplete="off"
                    className={styled.visuallyHidden}
                    type="text"
                    value={(values.categoryId = incomeCategory.id)}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <div className={styled.category}>
                  <ModalSelect
                    options={expenseCategories}
                    onClick={(setId) => setFieldValue("categoryId", setId)}
                  />
                  {errors.categoryId && touched.categoryId && (
                    <div className={styled.categoryError}>{errors.categoryId}</div>
                  )}
                </div>
              )}
              <div className={styled.wrapper}>
                <div className={styled.moneyWrapper}>
                  <Field
                    autoComplete="off"
                    name="amount"
                    type="number"
                    placeholder="0.00"
                    className={styled.money}
                    onBlur={(e) => {
                      const { value } = e.target;
                      setFieldValue("amount", handleAmount(value));
                      handleBlur(e);
                    }}
                  />
                  <span className={styled.moneyError}>
                    <ErrorMessage name="amount" />
                  </span>
                </div>
                <div className={styled.dateWrapper}>
                  <Datetime
                    className={styled.date}
                    initialValue={startDate}
                    onChange={(value) =>
                      setFieldValue("transactionDate", value.toISOString())
                    }
                    closeOnSelect={true}
                    timeFormat={false}
                    dateFormat="DD.MM.yyyy"
                    isValidDate={valid}
                  />
                  <MdDateRange className={styled.dateIcon} />
                </div>
              </div>
              <div className={styled.commentWrapper}>
                <Field
                  name="comment"
                  type="text"
                  placeholder="Comment"
                  as="textarea"
                  className={styled.comment}
                />
                {errors.comment && touched.comment && (
                  <div className={styled.commentError}>{errors.comment}</div>
                )}
              </div>
              <div className={styled.btnWrapper}>
                <button className={styled.btnSubmit} type="submit">
                  Add
                </button>
                <button
                  className={styled.btnCancel}
                  type="button"
                  onClick={isCloseModal}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
export default ModalAddTransaction;