// アプリケーションの状態を管理するオブジェクト
// 状態はここに集約する
const state = {
    products: [],              // 商品データの配列
    selectedProductType: 'ALL', // 選択中の商品タイプ
    isLoading: false           // 読み込み中フラグ
};

// ローカルの商品データ
const getLocalProductList = () => {
    return [
        { productId: 1, name: "ラーメン", productType: "FOOD", price: 720, image: "https://frontend-engineer-exercise.herokuapp.com/image/ramen" },
        { productId: 2, name: "牛乳", productType: "DRINK", price: 150, image: "https://frontend-engineer-exercise.herokuapp.com/image/milk" },
        { productId: 3, name: "卵", productType: "FOOD", price: 150, image: "https://frontend-engineer-exercise.herokuapp.com/image/egg" },
        { productId: 4, name: "水", productType: "DRINK", price: 80, image: "https://frontend-engineer-exercise.herokuapp.com/image/water" },
        { productId: 5, name: "お茶", productType: "DRINK", price: 120, image: "https://frontend-engineer-exercise.herokuapp.com/image/tea" },
        { productId: 6, name: "おにぎり", productType: "FOOD", price: 100, image: "https://frontend-engineer-exercise.herokuapp.com/image/riceball" },
        { productId: 7, name: "パスタ", productType: "FOOD", price: 1200, image: "https://frontend-engineer-exercise.herokuapp.com/image/pasta" },
        { productId: 8, name: "カレーライス", productType: "FOOD", price: 800, image: "https://frontend-engineer-exercise.herokuapp.com/image/curryrice" },
        { productId: 9, name: "ハンバーガー", productType: "FOOD", price: 600, image: "https://frontend-engineer-exercise.herokuapp.com/image/hamburger" },
    ];
};

// 商品タイプの日本語表記を取得する関数
const getProductTypeLabel = (productType) => {
    const labels = {
        'FOOD': 'フード',
        'DRINK': 'ドリンク'
    };
    return labels[productType] || productType;
};

// 商品データを取得する関数
const loadProducts = () => {
    state.isLoading = true;
    updateView();

    // ローカルデータなのでローディング再現
    setTimeout(() => {
        state.products = getLocalProductList();
        state.isLoading = false;
        updateView();
    }, 500);
};

// 商品タイプでフィルタリングした商品を返す関数
const getFilteredProducts = () => {
    if (state.selectedProductType === 'ALL') {
        return state.products;
    }
    return state.products.filter(product => product.productType === state.selectedProductType);
};

// 商品カードのHTMLを生成する関数
const createProductCard = (product) => {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <div class="product-type">${getProductTypeLabel(product.productType)}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">¥${product.price.toLocaleString()}</div>
            </div>
        </div>
    `;
};

// 画面を更新する関数
const updateView = () => {
    const app = document.querySelector('.app-content');
    const buttonA = document.getElementById('buttonA');

    buttonA.disabled = state.isLoading;

    if (state.isLoading) {
        app.innerHTML = '<div class="message">読み込み中...</div>';
        return;
    }

    // フィルタリングされた商品を取得
    const filteredProducts = getFilteredProducts();

    // 商品一覧のHTMLを生成
    const productsHTML = filteredProducts.map(product => createProductCard(product)).join('');
    app.innerHTML = `<div class="product-grid">${productsHTML}</div>`;
};

// 商品タイプ選択が変更されたときの処理
const handleProductTypeChange = (event) => {
    state.selectedProductType = event.target.value;
    updateView();
};

const handleButtonA = () => {
    console.log('Button A clicked');
};

const handleButtonB = () => {
    console.log('Button B clicked');
};

// 初期化処理
const init = () => {
    document.getElementById('productTypeFilter').addEventListener('change', handleProductTypeChange);
    document.getElementById('buttonA').addEventListener('click', handleButtonA);
    document.getElementById('buttonB').addEventListener('click', handleButtonB);

    loadProducts();
};

// DOMの読み込みが完了したら初期化を実行
document.addEventListener('DOMContentLoaded', init);