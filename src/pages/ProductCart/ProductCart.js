import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Count from './Count';
import Check from './Check';
import './ProductCart.scss';

const ProductCart = () => {
  const [cartList, setCartList] = useState([]);
  const [isCheckALl, setIsCheckALl] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  let sumPrice = 0;

  useEffect(() => {
    fetch('/data/List.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setCartList(data);
      });
  }, []);

  const handleCheckALl = e => {
    setIsCheckALl(!isCheckALl);
    setIsCheck(cartList.map(el => el.id));
    if (isCheckALl) {
      setIsCheck([]);
    }
  };

  const handleCheck = e => {
    const { checked, id } = e.target.checked;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(el => el !== id));
    }
  };

  console.log(isCheck);

  const confirm = () => {
    if (window.confirm('주문을 완료하시겠습니까?')) {
      alert('주문이 완료되었습니다.');
    } else {
      alert('주문이 취소되었습니다.');
    }
  };

  const [count, setCount] = useState(1);

  const onIncrease = id => {
    setCartList(value =>
      value.map(el => {
        if (id === el.id) el.quantity++;
        return el;
      })
    );
  };
  const onDecrease = () => {
    setCount(count - 1);
  };

  const onChange = e => {};

  return (
    <section className="contents">
      <div className="cartTitle">
        <div className="titleBox">
          <h1>SHOPPING CART</h1>
          <ul className="titleList">
            <li>
              <span>Cart &nbsp;&nbsp;</span> &gt;
            </li>
            <li>Order &nbsp;&nbsp; &gt;</li>
            <li>Order confirmed</li>
          </ul>
        </div>
        {/*titleBox*/}
      </div>
      {/*cartTitle*/}
      <div className="cartContent">
        <div className="cartName">
          <p>제품</p>
        </div>
        {/*cartName*/}
        <div className="cartList">
          <div className="cartInfo">
            <input
              type="checkbox"
              checked={isCheckALl}
              onClick={handleCheckALl}
              className="check1"
              onChange={onChange}
            />
            <p className="info">제품 정보</p>
            <p className="count">수량</p>
            <p className="price">금액</p>
          </div>
          {/*cartInfo*/}
          {cartList.map((el, i) => {
            sumPrice = sumPrice + el.price * el.quantity;

            return (
              <div className="productList" key={el.id}>
                <input
                  key={el.id}
                  type="checkbox"
                  checked={isCheck.includes(el.id)}
                  onClick={handleCheck}
                  onChange={onChange}
                  className="check2"
                />
                <div className="prBox">
                  <img src={el.img} alt="img" className="prImg" />
                  <h1 className="prTitle">
                    {el.name}
                    <br />
                    <span className="prCate">{el.category}</span>
                  </h1>
                </div>
                {/*prBox*/}
                <div className="countBox">
                  <Count
                    el={el}
                    count={count}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onChange={onChange}
                  />
                </div>
                <button
                  className="listDelete"
                  onClick={() => {
                    let del = [...cartList];
                    del.splice(i, 1);
                    setCartList(del);
                  }}
                >
                  X
                </button>
                {/*countBox*/}
              </div>
            );
          })}
        </div>
        {/*cartList*/}
        <div className="cartPrice">
          <p className="countPrice">총 {cartList.length} 개의 금액</p>
          <p className="countPrice">
            ₩
            <span className="totalPrice">
              {sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </span>{' '}
            + 배송비 ₩
            <span className="totalPrice">
              {cartList.length === 0 ? 0 : '2,500'}
            </span>
          </p>
          <p className="totalPrice">
            = &nbsp;총 주문금액&nbsp;&nbsp;{' '}
            <span>
              ₩
              {cartList.length === 0
                ? 0
                : (2500 + sumPrice)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </span>
          </p>
        </div>
        {/*cartPrice"*/}
        <button
          className="delBtn"
          onClick={() => {
            let del = [...cartList];
            del.splice(cartList);
            setCartList(del);
          }}
        >
          삭제 하기
        </button>
        {/*cartPrice*/}
        <div className="cartButton">
          <div className="goShopping">
            <Link to="/" className="going">
              쇼핑 계속하기
            </Link>
            <button className="orderBtn" onClick={confirm}>
              주문하기
            </button>
          </div>
          {/*goShopping*/}
        </div>
      </div>
    </section>
  );
};

export default ProductCart;
