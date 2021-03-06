$(function () {
    //显示部门
    initDepartMent();
    async function initDepartMent() {
        let result = await queryDepart();
        if (result.code == 0) {
            let str = ``;
            result.data.forEach(item => {
                str += `
                <option value="${item.id}">${item.name}</option>
                `
            });
            $(".selectBox").html(str)
        }
    }

    //显示员工
    showUserList()
    async function showUserList() {
        let params = {
            departmentId: $(".selectBox").val(),
            search: $(".searchInp").val().trim()
        }
        let result = await axios.get("/user/list", { params })
        // console.log(result);
        if (result.code !== 0) return;
        let str = ``;
        result.data.forEach(item => {
            let {
                id,
                name,
                sex,
                email,
                phone,
                department,
                job,
                desc
            } = item;
            //拼接字符串
            str +=
                `<tr>
				<td class="w3"><input type="checkbox" userId="${id}"></td>
				<td class="w10">${name}</td>
				<td class="w5">${sex == 0 ? '男' : '女'}</td>
				<td class="w10">${department}</td>
				<td class="w10">${job}</td>
				<td class="w15">${email}</td>
				<td class="w15">${phone}</td>
				<td class="w20">${desc}</td>
				<td class="w12" userId="${id}">
					<a href="javascript:;">编辑</a>
					<a href="javascript:;">删除</a>
					<a href="javascript:;">重置密码</a>
				</td>
			</tr>`;
        })
        $("tbody").html(str)
    }

    // 根据条件显示员工列表
    searchHandle();
    function searchHandle() {
        $(".selectBox").change(showUserList);
        $(".searchInp").on("keydown", e => {
            if (e.keyCode === 13) {  // 回车
                showUserList();
            }
        })
    }

})