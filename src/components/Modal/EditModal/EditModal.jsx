import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Datetime from 'react-datetime';

import { Modal } from 'components/Modal/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IconContext } from 'react-icons';
import { GrClose } from 'react-icons/gr';
import { MdDateRange } from 'react-icons/md';
import moment from 'moment';

import { toggleEditModal } from 'redux/modal/modalSlice';
import financeSelectors from 'redux/finances/financial-selectors';
import { editTransaction } from 'redux/finances/finances-operations';

import 'react-datetime/css/react-datetime.css';
import styled from './EditModal.module.scss';

const handleAmount = value => {
  if (!value || Number.isNaN(Number(value))) return value;
  const length = value.length;
  const dot = value.indexOf('.');
  if (dot < 0) {
    return value.concat('.00');
  }
  if (dot < length - 3) {
    return value.slice(0, dot + 3);
  }

  if (dot > length - 3) {
    return value.padEnd(dot + 3, '0');
  }
  return value;
};
const valid = function (current) {
  const tommorow = moment().subtract(0, 'day');
  return current.isBefore(tommorow);
};
export const EditModal = ({ editItem }) => {
  const { id, comment } = editItem;
  console.log('editItems :>> ', editItem);

  const dispatch = useDispatch();
  const categories = useSelector(financeSelectors.getCategories);
  const startDate = new Date();
  const [chooseType] = useState(false);
  const [type] = useState('EXPENSE');
  const incomeCategory = categories?.find(
    category => category.type === 'INCOME'
  );
  const isCloseModal = () => {
    dispatch(toggleEditModal());
  };

  const onEditTransactions = () => {
    dispatch(editTransaction(id));
    dispatch(toggleEditModal())
  };

  return (
    <Modal closeModal={isCloseModal}>
      <div className={styled.transaction}>
        <button onClick={isCloseModal} className={styled.buttonClose}>
          <IconContext.Provider
            value={{ className: 'global-class-name', size: '16px' }}
          >
            <GrClose />
          </IconContext.Provider>
        </button>
        <Formik
          initialValues={{
            type: type,
            amount:  editItem.amount,
            comment: editItem.comment,
            categoryId:  editItem.categoryId,
            transactionDate: startDate,
          }}
          enableReinitialize
          validateOnBlur
          onSubmit={(values) => dispatch(editTransaction(values.editItem.id)) }
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
              <h1 className={styled.form__title}>Edit transaction</h1>
              <div className={styled.checkbox}>
                <span
                  className={`${styled.checkboxIncome} ${
                    chooseType && styled.checkboxChecked
                  }`}
                >
                  Income /
                </span>

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
                  {errors.categoryId && touched.categoryId && (
                    <div className={styled.categoryError}>
                      {errors.categoryId}
                    </div>
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
                    onBlur={e => {
                      const { value } = e.target;
                      setFieldValue('amount', handleAmount(value));
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
                    onChange={value =>
                      setFieldValue('transactionDate', value.toISOString())
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
                  placeholder={comment}
                  as="textarea"
                  className={styled.comment}
                />
                {errors.comment && touched.comment && (
                  <div className={styled.commentError}>{errors.comment}</div>
                )}
              </div>
              <div className={styled.btnWrapper}>
                <button
                  type="submit"
                  className={styled.btnSubmit}
                  onClick={() => {
                    onEditTransactions(id);
                  }}
                >
                  SAVE
                </button>
                <button
                  className={styled.btnCancel}
                  type="button"
                  onClick={isCloseModal}
                >
                  CANEL
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
