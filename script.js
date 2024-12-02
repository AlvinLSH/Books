class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const container = document.querySelector('.container')


const dialog = document.querySelector("dialog");
const showDialog = document.querySelector("#showDialog");
const closeBtn = document.querySelector("#cancel");
const submitDialog = document.querySelector("#confirm");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read")


submitDialog.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
    return addBookToLibrary();
})


function addBookToLibrary() {
    if (read.checked) {
        read.value = 'Read';
    } else {
        read.value = 'Unread';
    }
    myLibrary.push(new Book(title.value, 
        author.value, 
        pages.value,
        read.value));
    return displayBook();
}

function displayBook() {
    container.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const div = document.createElement("div");
        const readBtn = document.createElement('button');
        container.appendChild(div);
        div.classList.add('books');
        div.setAttribute("data-index", i);
        for (let key in myLibrary[i]) {
            if (key === 'read') {
                const isRead = myLibrary[i][key] === 'Read';
                readBtn.classList.add(isRead ? 'read' : 'unread');
                readBtn.innerHTML = isRead ? 'Read' : 'Not read'; 
                div.appendChild(readBtn);
                readBtn.setAttribute("data-index", i);
            } else {
                let para = document.createElement('p');
                para.textContent = myLibrary[i][key];
                console.log(para.textContent);
                div.appendChild(para);
            }
            
        }
        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.classList.add("remove");
        btn.setAttribute("data-index", i);
        div.appendChild(btn);
    }

    //const toggleRead = document.querySelectorAll(".read");
    //for (let btn of toggleRead) {
    //    btn.addEventListener("click", (e) => {
    //        const toggleBtn = e.target;
    //        const index = toggleBtn.getAttribute("data-index");
    //        toggleBtn.classList.remove("read");
    //        toggleBtn.classList.add("unread");
    //        toggleBtn.innerHTML = "Not read";
    //        myLibrary[index]["read"] = "Not Read";
    //    });
    //}
    //
    //const toggleUnread = document.querySelectorAll(".unread");
    //for (let btn of toggleUnread) {
    //    btn.addEventListener("click", (e) => {
    //        const toggleBtn = e.target;
    //        const index = toggleBtn.getAttribute("data-index");
    //        toggleBtn.classList.remove("unread");
    //        toggleBtn.classList.add("read");
    //        toggleBtn.innerHTML = "Read";
    //        myLibrary[index]["read"] = "Read";
    //    });
    //}

    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("read") || e.target.classList.contains("unread")) {
            const toggleBtn = e.target;
            const index = toggleBtn.getAttribute("data-index");

            if (toggleBtn.classList.contains("read")) {
                toggleBtn.classList.remove("read");
                toggleBtn.classList.add("unread");
                toggleBtn.innerHTML = "Not read";
                myLibrary[index][read] = "Not Read";
            } else {
                toggleBtn.classList.remove("unread");
                toggleBtn.classList.add("read");
                toggleBtn.innerHTML = "Read";
                myLibrary[index]["read"] = "Read" 
            }
        }
    });


    //const removeBtns = document.querySelectorAll(".remove");
    //for (let btn of removeBtns) {
    //    btn.addEventListener("click", () => {
    //        const index = btn.getAttribute("data-index");
    //        myLibrary.splice(index, 1);
    //        console.log(index);
    //        displayBook();
    //    });
    //} 
}





const myLibrary = [];



showDialog.addEventListener('click', () => {
    dialog.showModal();
});

closeBtn.addEventListener('click', () => {
    dialog.close();
});



container.addEventListener('click', (event) => {
    if (event.target.classList.contains("remove")) {
        const divToRemove = event.target.parentElement;
        const index = divToRemove.getAttribute("data-index");
        myLibrary.splice(index, 1);
        container.removeChild(divToRemove);
        const remainingDivs = container.querySelectorAll(".books");
        remainingDivs.forEach((div, idx) => {
            div.setAttribute("data-index", idx);
        });
    }
});













