import React from 'react'
import BallImg from '../../images/svg/ball.svg'
import BellImg from '../../images/svg/bell.svg'
import ToyImg from '../../images/svg/toy.svg'
import SnowflakeImg from '../../images/svg/snowflake.svg'
import ConeImg from '../../images/svg/cone.svg'
import Nouislider from "nouislider-react";
import "nouislider/dist/nouislider.css";
import { filters } from '../../App'
export const urlLink = 'https://raw.githubusercontent.com/ButerBrot359/CT-Data/master/assets/toys/';
export const SettingsPage: React.FC = (data) => {
 

  const shape: string[] = ["шар", "колокольчик", "шишка", "снежинка", "фигурка"]
  const colors: string[] = ["белый", "желтый", "красный", "синий", "зелёный"]
  const size: string[] = ["большой", "средний", "малый"]

  return (
  <main className="main" id="settingsPage">
    <div className='main-container'>
      <div className='settings-field'>
        <div className='filter settings-block'>
          <h2 className='controls-title'>Фильтры по значению</h2>
          <div className='shapes'>
            <span className='settings-text'>Форма:</span>
            {shape.map(item => {
              return <TypeButton shape={item} setFilter={data.onToggle} />
            })}
          </div>
          <div className='color'>
            <span className='settings-text'>Цвет:</span>
            {colors.map(item => {
              return <ColorButton color={item} setFilter={data.onToggle} />
            })}
          </div>
          <div className="size">
            <span className='settings-text'>Размер:</span>
            {size.map(item => {
              return <SizeButton size={item} setFilter={data.onToggle} />
            })}
          </div>
          <div className="favorite">
            <span className='settings-text'>Только любимые:</span>
            <div className='form-group'>
              <FavoriteCheckbox setFilter={data.onToggle}/>
            </div>
          </div>
        </div>
        <div className='range settings-block'>
            <h2 className='controls-title'>Фильтры по диапазону</h2>
            <div className="range-inputs">
              <div className='inputs_amount-block'>
                <span className='settings-text'>Количество экземпляров:</span>
                <div className="range-inputs_amount">
                  <div className="amount-output-min">1</div>
                  <div className='input-field'><Nouislider range={{ min: 1, max: 12 }} start={[1, 12]} step={1} onUpdate={()=>{changeAmount();data.setAmountCards(filters.amount)}} connect tooltips/></div>
                  <div className="amount-output-max">12</div>
                </div>
              </div>
              <div className='inputs_year-block'>
                <span className='settings-text'>Год приобретения:</span>
                <div className="range-inputs_year">
                  <div className="year-output-min">1940</div>
                  <div className='input-field'><Nouislider range={{ min: 1940, max: 2020 }} start={[1940, 2020]} step={10} onUpdate={()=>{changeYear()}} connect tooltips/></div>
                  <div className="year-output-max">2020</div>
                </div>
              </div>
            </div>

        </div>
        <div className='sort settings-block'>
          <h2 className='controls-title'>Сортировка: </h2>
          <div className="sort-inputs">
            <select className="sort-select" defaultValue={'sort-name-max'}>
              <option value="sort-name-max">По названию от «А» до «Я»</option>
              <option value="sort-name-min">По названию от «Я» до «А»</option>
              <option value="sort-count-max">По количеству по возрастанию</option>
              <option value="sort-count-min">По количеству по убыванию</option>
            </select>
            <ResetButton />
          </div>
        </div>
      </div>
      <div className="cards-field">
        {data.cards.map(el => {
          return <Card item={el} key={el.num}/>
        })}
      </div>
    </div>
  </main>
)
}

function changeAmount() {
  let value = document.querySelectorAll('.range-inputs_amount .noUi-tooltip')
  let amountMinData = value[0].textContent.split('.')[0]
  let amountMaxData = value[1].textContent.split('.')[0]
  filters.amount = [Number(amountMinData), Number(amountMaxData)]
  document.querySelector('.amount-output-min').innerHTML = amountMinData
  document.querySelector('.amount-output-max').innerHTML = amountMaxData
}

function changeYear() {
  let value = document.querySelectorAll('.range-inputs_year .noUi-tooltip')
  let yearMinData = value[0].textContent.split('.')[0]
  let yearMaxData = value[1].textContent.split('.')[0]
  filters.year = [Number(yearMinData), Number(yearMaxData)]
  document.querySelector('.year-output-min').innerHTML = yearMinData
  document.querySelector('.year-output-max').innerHTML = yearMaxData
  console.log(filters)
}
const ResetButton: React.FC = () => {
  return (
    <>
      <button className="reset">Сброс фильтров</button>
    </>
  )
}
const FavoriteCheckbox: React.FC = ({setFilter}) => {
  let [isActive, setActive] = React.useState(false)
  return (
    <>
      <label htmlFor="checkbox" className={`favorite-input-label ${isActive}`}></label>
      <input type="checkbox" className={`favorite-input`} id="checkbox" onChange={()=> {setFilter(null, 'favorite'); setActive(!isActive)} }/>
    </>
  )
}
const SizeButton: React.FC = ({size, setFilter}) => {
  let [isActive, setActive] = React.useState(false)
  return (
    <>
      <button className={`${size} size-button ${isActive}`} onClick={() => {setFilter(size, 'size'); setActive(!isActive)}}><img src={BallImg} alt="" /></button>
    </>
  )
}
const ColorButton: React.FC = ({ color, setFilter }) => {
  let [isActive, setActive] = React.useState(false)
  let colorEng: string;
  switch (color) {
    case "белый":
      colorEng = "white"
      break;
    case "красный":
      colorEng = "red"
      break;
    case "желтый":
      colorEng = "yellow"
      break;
    case "синий":
      colorEng = "blue"
      break;
    case "зелёный":
      colorEng = "green"
      break;
    default:
      break;
  }
  return (
    <>
      <button className={`${color} color-button ${isActive}`} style={{ backgroundColor: colorEng }} onClick={() => {setFilter(color, 'color'); setActive(!isActive)}}></button>
    </>
  )
}
const TypeButton: React.FC = ({shape, setFilter}) => {
  let [isActive, setActive] = React.useState(false)
  let src: string;
  switch (shape) {
    case "шар":
      src = BallImg
      break;
    case "колокольчик":
      src = BellImg
      break;
    case "шишка":
      src = ConeImg
      break;
    case "снежинка":
      src = SnowflakeImg
      break;
    case "фигурка":
      src = ToyImg
      break;
    default:
      break;
  }
  return <>
    <button className={`${shape} shape-button ${isActive}`} onClick={() => {setFilter(shape, 'shape'), setActive(!isActive)}}><img src={src} alt="" /></button>
  </>
}
const Card: React.FC = (card) => {
  return (
    <>
      <div className='card' id={`card-${card.item.num}`}>
        <h2 className='card-title'>{card.item.name}</h2>
        <img className='card-img' src={`${urlLink}${card.item.num}.png`} alt="" />
        <div className="card-description">
          <p>Количество: {card.item.count}</p>
          <p>Год покупки: {card.item.year}</p>
          <p>Форма: {card.item.shape}</p>
          <p>Цвет: {card.item.color}</p>
          <p>Размер: {card.item.size}</p>
          <p>Любимая: {card.item.favorite ? "Да" : "Нет"}</p>
        </div>
        <div className='ribbon'></div>
      </div>
    </>
  )
}
