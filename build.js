
/**
 * 自动生成版本号脚本思路
 * 1.获取传进来的参数
 * 2.根据参数进行逻辑处理
 * 3.获取package.json中的version参数
 * 4.修改version的值写入package.json文件
 *
 * 用下列命令执行
 * node build.js --type=major
 * node build.js --type=minor
 * node build.js --type=revision
 * node build.js --version=1.2.3
 */


let fs = require('fs')
let archiver = require('archiver')
let packageJSON = require('./package.json')

let appName = packageJSON.name  //package.json文件的version参数
let version = packageJSON.version  //package.json文件的version参数
let options = process.argv  //输入命令时的所有参数
let newVersion = null  //输入命令时的version参数
let type = null  //输入命令时的type参数

//判断命令行是否存在type参数或version参数进行逻辑处理
for (let i = 0; i < options.length; i++) {
  if (options[i].indexOf('type') > -1) {
    type = options[i].split('=')[1]
  } else if (options[i].indexOf('version') > -1) {
    newVersion = options[i].split('=')[1]
  } else {
    //code
  }
}

//存在设置version参数则改变原来的version,不设置version则根据type来进行修改version
if (newVersion) {
  version = newVersion
} else if (type) {
  version = handleType(version, type)
} else {
  version = null
  console.log('-----------没有改变version-----------')
}

//修改了version则同步写入package.json文件
if (version) {
  packageJSON.version = version
  fs.writeFileSync('package.json', JSON.stringify(packageJSON, null, 2))
  console.log('-----------更新package的version为：%s参数成功-----------', version)
}

/**
 * 根据分支类型处理版本号version
 * @param {string} oldVersion 旧的版本号
 * @param {string} type 分支类型
 * @private
 */
function handleType (oldVersion, type) {
  let oldVersionArr = oldVersion.split('.')
  //版本号第一位 如：1.2.3 则为 1
  let majorNum = +oldVersionArr[0]
  //版本号第二位 如：1.2.3 则为 2
  let minorNum = +oldVersionArr[1]
  //版本号第三位 如：1.2.3 则为 3
  let revisionNum = +oldVersionArr[2]
  switch (type) {
    case 'major':
      ++majorNum
      break
    case 'minor':
      ++minorNum
      break
    case 'revision':
      ++revisionNum
      break
    default:
      ++revisionNum
      break
  }
  
  return majorNum + '.' + minorNum + '.' + revisionNum
}


let pkgDir = './packages';
if (!fs.existsSync(pkgDir)){
  fs.mkdirSync(pkgDir);
}
//在 packages 目录下生成压缩包
let output = fs.createWriteStream(`./packages/${appName}_${packageJSON.version}.zip`)
let archive = archiver('zip', {
  zlib: { level: 9 }
})

output.on('close', function() {
  console.log('archiver close' + archive.pointer() + ' total bytes')
})

output.on('end', function() {
  console.log('Data has been drained')
})

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err
  }
})

archive.on('error', function(err) {
  throw err
})

archive.pipe(output)
//将 dist 目录下的文件放入压缩包中的根目录下
archive.directory('dist/', false)
archive.finalize()
