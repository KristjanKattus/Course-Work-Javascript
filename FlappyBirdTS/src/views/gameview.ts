export default function gameView() {
    let content = document.createElement('div');
    content.id = "view-container";
    content.style.textAlign = "center";
    content.style.alignContent = "center";
    content.innerText = 'CONTAINER';

    return content;
}