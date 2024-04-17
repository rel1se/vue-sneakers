<template>
  <div>
    <ul>
      <li>
        <a href="https://t.me/rel1seg0d">Telegram</a>
        <img src="/telegram.svg" alt="Telegram"/>
      </li>
      <li>
        <a href="mailto:botoevslava27032003@mail.ru">Email</a>
        <img src="/email.svg" alt="Email"/>
      </li>
      <li>
        <a href="https://github.com/rel1se">Github</a>
        <img src="/github.svg" alt="Github"/>
      </li>
      <li>
        <p>👋</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  div{
    display: flex;
    height: 1vh;
    width: 100%;
    line-height: 1.3;
    font-family: Menlo, monospace;
    margin-top: 5vh;
    margin-left: 5vh;
  }
  ul{
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
  }
  li{
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 24px;
  }
  a{
    position: relative;
    text-decoration: none;
    box-shadow: inset 0 -1px 0 hsla(0, 0%, 100%, 0.4);
    transition: box-shadow 0.3s ease;
  }
  a:hover{
    box-shadow: inset 0 -1.2em 0 hsla(0, 0%, 100%, 0.4);
  }
  a::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 1px;
    background-color: #000000;
    transition: width 0.3s ease;
  }
  a:hover::after{
    width: 100%;
  }
  p{
    margin-right: 10px;
  }
  img{
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
  li:last-child{
    margin-right: 0;
  }
  li:hover ~ li p{
    animation: wave-animation 0.3s infinite;
  }
  @keyframes wave-animation {
    0%, 100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(20deg);
    }
    75% {
      transform: rotate(-15deg);
    }
  }
</style>