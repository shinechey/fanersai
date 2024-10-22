const categories = {}; // 存储分类和书签

// 显示书签
function displayBookmarks() {
    const bookContainer = document.getElementById('categoryContainer');
    bookContainer.innerHTML = ''; // 清空当前显示的内容

    for (const category in categories) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        const categoryHeader = document.createElement('h3');
        categoryHeader.innerText = category;
        categoryHeader.onclick = () => displayCategoryDetails(category);
        categoryDiv.appendChild(categoryHeader);
        
        const bookContainerDiv = document.createElement('div');
        bookContainerDiv.classList.add('book-container');

        // 仅展示每个分类的最新15项
        const booksToShow = categories[category].slice(-15);
        booksToShow.forEach(bookData => {
            const book = document.createElement('div');
            book.classList.add('book');

            const coverImg = document.createElement('img');
            coverImg.src = bookData.coverURL;

            const title = document.createElement('h3');
            title.innerText = bookData.name;

            const link = document.createElement('a');
            link.href = bookData.url;
            link.target = '_blank';
            link.innerText = '访问网站';

            book.appendChild(coverImg);
            book.appendChild(title);
            book.appendChild(link);

            bookContainerDiv.appendChild(book);
        });

        categoryDiv.appendChild(bookContainerDiv);
        bookContainer.appendChild(categoryDiv);
    }
}

// 显示所有书签
function displayAllBookmarks() {
    const bookContainer = document.getElementById('categoryContainer');
    bookContainer.innerHTML = ''; // 清空当前显示的内容

    for (const category in categories) {
        categories[category].forEach(bookData => {
            const book = document.createElement('div');
            book.classList.add('book');

            const coverImg = document.createElement('img');
            coverImg.src = bookData.coverURL;

            const title = document.createElement('h3');
            title.innerText = bookData.name;

            const link = document.createElement('a');
            link.href = bookData.url;
            link.target = '_blank';
            link.innerText = '访问网站';

            book.appendChild(coverImg);
            book.appendChild(title);
            book.appendChild(link);

            bookContainer.appendChild(book);
        });
    }
}

// 处理书签提交
document.getElementById('submitBookmarkButton').addEventListener('click', function() {
    const name = document.getElementById('bookmarkName').value;
    const url = document.getElementById('bookmarkURL').value;
    const category = document.getElementById('category').value;
    const coverImageInput = document.getElementById('coverImage');

    // 检查用户是否选择了封面图像
    if (coverImageInput.files.length > 0) {
        const file = coverImageInput.files[0];
        const reader = new FileReader();

        // 读取文件并存储图像
        reader.onload = function(e) {
            const coverURL = e.target.result; // 图像的 base64 URL

            // 创建书签数据
            const bookData = {
                name: name,
                url: url,
                coverURL: coverURL,
                category: category,
            };

            // 保存书签到分类
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(bookData);

            // 清空输入框
            document.getElementById('bookmarkName').value = '';
            document.getElementById('bookmarkURL').value = '';
            document.getElementById('category').value = '';
            coverImageInput.value = '';

            // 显示书架
            displayBookmarks();
        };

        // 开始读取文件
        reader.readAsDataURL(file);
    } else {
        alert("请上传封面图像");
    }
});

// 添加分类功能
document.getElementById('addCategoryButton').addEventListener('click', function() {
    document.getElementById('addCategoryForm').style.display = 'block'; // 显示添加分类表单
    document.getElementById('uploadFormSection').style.display = 'none'; // 隐藏添加收藏表单
    document.querySelector('.bookshelf').style.display = 'none'; // 隐藏书架展示
});

// 提交分类按钮的事件处理
document.getElementById('submitCategoryButton').addEventListener('click', function() {
    const categoryName = document.getElementById('categoryName').value;

    if (categoryName) {
        // 添加分类
        if (!categories[categoryName]) {
            categories[categoryName] = []; // 创建新分类
        }

        // 清空输入框
        document.getElementById('categoryName').value = '';

        // 隐藏添加分类表单
        document.getElementById('addCategoryForm').style.display = 'none';

        // 更新分类下拉框
        const categorySelect = document.getElementById('category');
        const newOption = document.createElement('option');
        newOption.value = categoryName;
        newOption.innerText = categoryName;
        categorySelect.appendChild(newOption);
    } else {
        alert("分类名称不能为空");
    }
});

// 添加按钮点击事件
document.getElementById('addBookmarkButton').addEventListener('click', function() {
    document.getElementById('uploadFormSection').style.display = 'block'; // 显示添加收藏表单
    document.getElementById('addCategoryForm').style.display = 'none'; // 隐藏添加分类表单
    document.querySelector('.bookshelf').style.display = 'none'; // 隐藏书架展示
});

document.getElementById('showAllButton').addEventListener('click', function() {
    displayAllBookmarks(); // 显示所有书签
    document.getElementById('addCategoryForm').style.display = 'none'; // 隐藏添加分类表单
    document.getElementById('uploadFormSection').style.display = 'none'; // 隐藏添加收藏表单
});

// 切换显示分类详细信息
function displayCategoryDetails(category) {
    const bookContainer = document.getElementById('categoryContainer');
    bookContainer.innerHTML = ''; // 清空当前显示的内容

    categories[category].forEach(bookData => {
        const book = document.createElement('div');
        book.classList.add('book');

        const coverImg = document.createElement('img');
        coverImg.src = bookData.coverURL;

        const title = document.createElement('h3');
        title.innerText = bookData.name;

        const link = document.createElement('a');
        link.href = bookData.url;
        link.target = '_blank';
        link.innerText = '访问网站';

        book.appendChild(coverImg);
        book.appendChild(title);
        book.appendChild(link);

        bookContainer.appendChild(book);
    });
}
