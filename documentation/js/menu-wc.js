'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">code_scanning documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-8540353bc42e5ad1749bba4bda3787aaa0045f02303b6258caa8cb3f98f5294afd22bf04015667f13635d3c32f713859a5bc1387e5258d2d5d89b0a6422c186a"' : 'data-target="#xs-controllers-links-module-AppModule-8540353bc42e5ad1749bba4bda3787aaa0045f02303b6258caa8cb3f98f5294afd22bf04015667f13635d3c32f713859a5bc1387e5258d2d5d89b0a6422c186a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-8540353bc42e5ad1749bba4bda3787aaa0045f02303b6258caa8cb3f98f5294afd22bf04015667f13635d3c32f713859a5bc1387e5258d2d5d89b0a6422c186a"' :
                                            'id="xs-controllers-links-module-AppModule-8540353bc42e5ad1749bba4bda3787aaa0045f02303b6258caa8cb3f98f5294afd22bf04015667f13635d3c32f713859a5bc1387e5258d2d5d89b0a6422c186a"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CacheWrapperModule.html" data-type="entity-link" >CacheWrapperModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CacheWrapperModule-bc592e6dfed9a30d867ba9e953f1ce96d90736cf78c19659dbdb8dff19809128f5573cc5dee8c6e3786d88e0930c56ce4ab47d42df89c8c6ce4f4eab7d247793"' : 'data-target="#xs-injectables-links-module-CacheWrapperModule-bc592e6dfed9a30d867ba9e953f1ce96d90736cf78c19659dbdb8dff19809128f5573cc5dee8c6e3786d88e0930c56ce4ab47d42df89c8c6ce4f4eab7d247793"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CacheWrapperModule-bc592e6dfed9a30d867ba9e953f1ce96d90736cf78c19659dbdb8dff19809128f5573cc5dee8c6e3786d88e0930c56ce4ab47d42df89c8c6ce4f4eab7d247793"' :
                                        'id="xs-injectables-links-module-CacheWrapperModule-bc592e6dfed9a30d867ba9e953f1ce96d90736cf78c19659dbdb8dff19809128f5573cc5dee8c6e3786d88e0930c56ce4ab47d42df89c8c6ce4f4eab7d247793"' }>
                                        <li class="link">
                                            <a href="injectables/CacheWrapperService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CacheWrapperService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventQueueModule.html" data-type="entity-link" >EventQueueModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-EventQueueModule-a82eadaceff0f02130f01fffc1d4c043181f19339b8169e6042a47bc9855301e12173c254f2675002dc2dc64e7dfd835e5698d57a3468cfdaefd0e91163e8c08"' : 'data-target="#xs-injectables-links-module-EventQueueModule-a82eadaceff0f02130f01fffc1d4c043181f19339b8169e6042a47bc9855301e12173c254f2675002dc2dc64e7dfd835e5698d57a3468cfdaefd0e91163e8c08"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EventQueueModule-a82eadaceff0f02130f01fffc1d4c043181f19339b8169e6042a47bc9855301e12173c254f2675002dc2dc64e7dfd835e5698d57a3468cfdaefd0e91163e8c08"' :
                                        'id="xs-injectables-links-module-EventQueueModule-a82eadaceff0f02130f01fffc1d4c043181f19339b8169e6042a47bc9855301e12173c254f2675002dc2dc64e7dfd835e5698d57a3468cfdaefd0e91163e8c08"' }>
                                        <li class="link">
                                            <a href="injectables/EventQueueProducer.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventQueueProducer</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScansModule.html" data-type="entity-link" >ScansModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ScansModule-08f6bafccafc94bc2b3a59de11b64ff0205465add798148420f97b0d4d72a3460d716a5a3d14c9a085b281c6b8392a2930877bd0648c83f67589978ad5056040"' : 'data-target="#xs-controllers-links-module-ScansModule-08f6bafccafc94bc2b3a59de11b64ff0205465add798148420f97b0d4d72a3460d716a5a3d14c9a085b281c6b8392a2930877bd0648c83f67589978ad5056040"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ScansModule-08f6bafccafc94bc2b3a59de11b64ff0205465add798148420f97b0d4d72a3460d716a5a3d14c9a085b281c6b8392a2930877bd0648c83f67589978ad5056040"' :
                                            'id="xs-controllers-links-module-ScansModule-08f6bafccafc94bc2b3a59de11b64ff0205465add798148420f97b0d4d72a3460d716a5a3d14c9a085b281c6b8392a2930877bd0648c83f67589978ad5056040"' }>
                                            <li class="link">
                                                <a href="controllers/ScansController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScansController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ScansModule-08f6bafccafc94bc2b3a59de11b64ff0205465add798148420f97b0d4d72a3460d716a5a3d14c9a085b281c6b8392a2930877bd0648c83f67589978ad5056040"' : 'data-target="#xs-injectables-links-module-ScansModule-08f6bafccafc94bc2b3a59de11b64ff0205465add798148420f97b0d4d72a3460d716a5a3d14c9a085b281c6b8392a2930877bd0648c83f67589978ad5056040"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ScansModule-08f6bafccafc94bc2b3a59de11b64ff0205465add798148420f97b0d4d72a3460d716a5a3d14c9a085b281c6b8392a2930877bd0648c83f67589978ad5056040"' :
                                        'id="xs-injectables-links-module-ScansModule-08f6bafccafc94bc2b3a59de11b64ff0205465add798148420f97b0d4d72a3460d716a5a3d14c9a085b281c6b8392a2930877bd0648c83f67589978ad5056040"' }>
                                        <li class="link">
                                            <a href="injectables/ScanEventContext.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScanEventContext</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ScansService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScansService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkersModule.html" data-type="entity-link" >WorkersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WorkersModule-790e7169aaddd36cfb32d5e9ffb7f4e1da94acae6668859ae806c3169b27b5e2506882605035f635337fe28d88ec6c24cae6e080752957a1350f06b28354fd55"' : 'data-target="#xs-injectables-links-module-WorkersModule-790e7169aaddd36cfb32d5e9ffb7f4e1da94acae6668859ae806c3169b27b5e2506882605035f635337fe28d88ec6c24cae6e080752957a1350f06b28354fd55"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WorkersModule-790e7169aaddd36cfb32d5e9ffb7f4e1da94acae6668859ae806c3169b27b5e2506882605035f635337fe28d88ec6c24cae6e080752957a1350f06b28354fd55"' :
                                        'id="xs-injectables-links-module-WorkersModule-790e7169aaddd36cfb32d5e9ffb7f4e1da94acae6668859ae806c3169b27b5e2506882605035f635337fe28d88ec6c24cae6e080752957a1350f06b28354fd55"' }>
                                        <li class="link">
                                            <a href="injectables/ScanEventProcessor.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScanEventProcessor</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/ScanEvent.html" data-type="entity-link" >ScanEvent</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Vulnerability.html" data-type="entity-link" >Vulnerability</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseSchema.html" data-type="entity-link" >BaseSchema</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateScanRequestDto.html" data-type="entity-link" >CreateScanRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateScanResponseDto.html" data-type="entity-link" >CreateScanResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EventQueueConsumer.html" data-type="entity-link" >EventQueueConsumer</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindingResponseDto.html" data-type="entity-link" >FindingResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOneScanResponseDto.html" data-type="entity-link" >FindOneScanResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Location.html" data-type="entity-link" >Location</a>
                            </li>
                            <li class="link">
                                <a href="classes/UtilsService.html" data-type="entity-link" >UtilsService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewInterceptor.html" data-type="entity-link" >ViewInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/EventInterface.html" data-type="entity-link" >EventInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});