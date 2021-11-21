.PHONY: app
default: help

# build all theme
dev-h5:
	npm run dev:h5

dev-wx:
	npm run dev:mp-weixin

dev-ali:
	npm run dev:mp-alipay

dev-tou:
	npm run dev:mp-toutiao

dev-qq:
	npm run dev:mp-qq

dev-bd:
	npm run dev:mp-baidu
	
build-h5:
	npm run build:h5

build-wx:
	npm run build:mp-weixin

build-ali:
	npm run build:mp-alipay

build-tou:
	npm run build:mp-toutiao

build-qq:
	npm run build:mp-qq

build-bd:
	npm run build:mp-baidu	

dll:
	npm run build:dll
