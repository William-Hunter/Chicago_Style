var generator = {

    getDateObject:function(){
        var date = new Date()
        var result={}
        result.year = date.getFullYear()
        result.month_english = date.toDateString().split(" ")[1];
        result.day = date.getDate()
        return result
    },
    isEmpty: function (a) {
        if (a === "") return true; //检验空字符串
        if (a === "null") return true; //检验字符串类型的null
        if (a === "undefined") return true; //检验字符串类型的 undefined
        if (!a && a !== 0 && a !== "") return true; //检验 undefined 和 null
        if (Array.prototype.isPrototypeOf(a) && a.length === 0) return true; //检验空数组
        if (Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0) return true;  //检验空对象
        return false;
    },
    processDate: function(website){     //生成访问日期
        var date=null
        if(!this.isEmpty(website.year) ||
            !this.isEmpty(website.month) ||
            !this.isEmpty(website.day)){
            date= website.month + " " + website.day + "," + website.year
            // console.log("A",date,website)
        }else{
            var dataObj=this.getDateObject()
            date= dataObj.month_english + " " + dataObj.day + "," + dataObj.year
            // console.log("B",date)
        }
        return date
    },
    genMaga: function (format, info) {//生成期刊的结果
        var result
        if ('paper' == info.maga.magaType) {//期刊纸质
            result = format.paper

            result.notes = result.notes.replace("[Author First Name]", info.author.first_name)
            result.notes = result.notes.replace("[Author Last Name]", info.author.last_name)
            result.notes = result.notes.replace("[Article Title]", info.title)
            result.notes = result.notes.replace("[Journal Name]", info.maga.title)
            result.notes = result.notes.replace("[Volume]", info.maga.volume)
            result.notes = result.notes.replace("[Issue]", info.maga.issue)
            result.notes = result.notes.replace("[Year Published]", info.maga.year)
            result.notes = result.notes.replace("[Cited Page]", info.maga.page)

            result.bio = result.bio.replace("[Author First Name]", info.author.first_name)
            result.bio = result.bio.replace("[Author Last Name]", info.author.last_name)
            result.bio = result.bio.replace("[Article Title]", info.title)
            result.bio = result.bio.replace("[Journal Name]", info.maga.title)
            result.bio = result.bio.replace("[Volume]", info.maga.volume)
            result.bio = result.bio.replace("[Issue]", info.maga.issue)
            result.bio = result.bio.replace("[Year Published]", info.maga.year)
            result.bio = result.bio.replace("[Entire Page Range of Article]", info.maga.page)
        } else {//期刊电子
            result = format.electron

            var date=this.processDate(info.website)

            result.notes = result.notes.replace("[Author First Name]", info.author.first_name)
            result.notes = result.notes.replace("[Author Last Name]", info.author.last_name)
            result.notes = result.notes.replace("[Article Title]", info.title)
            result.notes = result.notes.replace("[Journal Name]", info.maga.title)
            result.notes = result.notes.replace("[Volume]", info.maga.volume)
            result.notes = result.notes.replace("[Issue]", info.maga.issue)
            result.notes = result.notes.replace("[Year Published]", info.maga.year)
            result.notes = result.notes.replace("[Cited Page]", info.maga.page)
            result.notes = result.notes.replace("[Accessed Date]", date)
            result.notes = result.notes.replace("[URL/DOI]", info.maga.link)

            result.bio = result.bio.replace("[Author First Name]", info.author.first_name)
            result.bio = result.bio.replace("[Author Last Name]", info.author.last_name)
            result.bio = result.bio.replace("[Article Title]", info.title)
            result.bio = result.bio.replace("[Journal Name]", info.maga.title)
            result.bio = result.bio.replace("[Volume]", info.maga.volume)
            result.bio = result.bio.replace("[Issue]", info.maga.issue)
            result.bio = result.bio.replace("[Year Published]", info.maga.year)
            result.bio = result.bio.replace("[Accessed Date]", date)
            result.bio = result.bio.replace("[URL/DOI]", info.maga.link)
            result.bio = result.bio.replace("[Entire Page Range of Article]", info.maga.page)
        }

        return result
    },
    genBooks: function (format, info) {//生成图书的内容
        var result = format

        result.notes = result.notes.replace("[Author First Name]", info.author.first_name)
        result.notes = result.notes.replace("[Author Last Name]", info.author.last_name)
        result.notes = result.notes.replace("[Book Title]", info.title)
        result.notes = result.notes.replace("[Publication Location]", info.book.location)
        result.notes = result.notes.replace("[Publisher Name]", info.book.publisher)
        result.notes = result.notes.replace("[Year Published]", info.book.year)
        if(info.book.page && ''!=info.book.page){//存在
            result.notes = result.notes.replace("[Page Number]", ", "+info.book.page)
        }else{                              //不存在
            result.notes = result.notes.replace("[Page Number]", " ")
        }

        result.bio = result.bio.replace("[Author First Name]", info.author.first_name)
        result.bio = result.bio.replace("[Author Last Name]", info.author.last_name)
        result.bio = result.bio.replace("[Book Title]", info.title)
        result.bio = result.bio.replace("[Publication Location]", info.book.location)
        result.bio = result.bio.replace("[Publisher Name]", info.book.publisher)
        result.bio = result.bio.replace("[Year Published]", info.book.year)

        return result
    },

    genWebsite: function (format, info) {
        var result = format
        var date=this.processDate(info.website)

        result.notes = result.notes.replace("[Author First Name]", info.author.first_name)
        result.notes = result.notes.replace("[Author Last Name]", info.author.last_name)
        result.notes = result.notes.replace("[Page Title]", info.title)
        result.notes = result.notes.replace("[Name of Publisher]", info.website.publisher)
        result.notes = result.notes.replace("[Website Name]", info.website.name)
        result.notes = result.notes.replace("[Date]", date)
        result.notes = result.notes.replace("[URL]", info.website.URL)

        result.bio = result.bio.replace("[Author First Name]", info.author.first_name)
        result.bio = result.bio.replace("[Author Last Name]", info.author.last_name)
        result.bio = result.bio.replace("[Page Title]", info.title)
        result.bio = result.bio.replace("[Name of Publisher]", info.website.publisher)
        result.bio = result.bio.replace("[Website Name]", info.website.name)
        result.bio = result.bio.replace("[Date]", date)
        result.bio = result.bio.replace("[URL]", info.website.URL)

        return result
    },




}

export default generator






