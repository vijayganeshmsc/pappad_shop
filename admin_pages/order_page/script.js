document.addEventListener('DOMContentLoaded', ()=>{
    const orders = [
        {id:'#10001', customer:'John Doe', status:'Pending', total:'$50.00', items:[{name:'Plain Papad',qty:2,price:20}]},
        {id:'#10002', customer:'Jane Smith', status:'Shipped', total:'$75.00', items:[{name:'Masala Papad',qty:3,price:25}]},
        {id:'#10003', customer:'Ravi Kumar', status:'Delivered', total:'$120.00', items:[{name:'Spicy Papad',qty:6,price:20}]}
    ];

    const tbody = document.getElementById('ordersTbody');
    const details = document.getElementById('orderDetails');

    function renderOrders(){
        tbody.innerHTML = '';
        orders.forEach((o,idx)=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${o.id}</td>
                <td>${o.customer}</td>
                <td>${o.status}</td>
                <td>${o.total}</td>
                <td><button class="btn btn-sm btn-outline-primary" data-idx="${idx}">View</button></td>
            `;
            tbody.appendChild(tr);
        });
    }

    function showDetails(idx){
        const o = orders[idx];
        details.innerHTML = `<p><strong>${o.id}</strong> — ${o.customer}</p>
            <p>Status: <span style="color:var(--dark-red)">${o.status}</span></p>
            <p>Total: ${o.total}</p>
            <h6>Items</h6>
            <ul>${o.items.map(i=>`<li>${i.name} × ${i.qty} — $${i.price}</li>`).join('')}</ul>
            <div class="mt-2"><button id="markShipped" class="btn-primary">Mark Shipped</button></div>
        `;

        const btn = document.getElementById('markShipped');
        if(btn){
            btn.addEventListener('click', ()=>{
                o.status = 'Shipped';
                renderOrders();
                showDetails(idx);
            });
        }
    }

    tbody.addEventListener('click', (e)=>{
        const btn = e.target.closest('button');
        if(!btn) return;
        const idx = btn.dataset.idx;
        if(idx!==undefined) showDetails(parseInt(idx,10));
    });

    document.getElementById('refreshOrders').addEventListener('click', ()=>{
        renderOrders();
    });

    renderOrders();
});
